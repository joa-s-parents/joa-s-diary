import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CatService } from './cat.service';
import { AddCatDto } from './dto/add-cat.dto';
import { CatEntity } from './entities/cat.entity';

describe('CatService', () => {
  let service: CatService;
  let repository: Repository<CatEntity>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getRepositoryToken(CatEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CatService>(CatService);
    repository = module.get<Repository<CatEntity>>(
      getRepositoryToken(CatEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add cat info', () => {
    it('[SUCC]should successfully insert a cat', async () => {
      expect(service.addCat(addCatDto)).resolves.not.toThrow();
    });
  });

  describe('get cat info by owner id', () => {
    it('[SUCC]should return an array of cats by owner id', async () => {
      expect(await service.getCatByOwnerId('joa_mother')).toStrictEqual(
        mockGetCatByOwnerId,
      );
    });
  });
});

//* Mocking data

// add cat dto
const addCatDto: AddCatDto = {
  name: 'joa',
  ownerId: 'joa_mother',
  sex: 1,
  birthedAt: new Date('2022-08-15 00:00:00'),
};

// cat entity
const mockGetCatByOwnerId: CatEntity[] = [
  {
    id: 2,
    ownerId: 'joa_mother',
    name: 'joa',
    sex: 1,
    birthedAt: new Date('2022-08-14T15:00:00.000Z'),
    deletedAt: null,
  },
];

const mockRepository = {
  insert: jest.fn().mockImplementation((req: AddCatDto) =>
    Promise.resolve({
      identifiers: [{ id: 1 }],
      generatedMaps: [{ id: 4 }],
    }),
  ),
  find: jest.fn().mockResolvedValue(mockGetCatByOwnerId),
  update: jest
    .fn()
    .mockResolvedValue({ generatedMaps: [], raw: [], affected: 1 }),
};
