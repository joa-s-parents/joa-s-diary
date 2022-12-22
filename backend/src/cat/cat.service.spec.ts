import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CatService } from './cat.service';
import { AddCatDto } from './dto/add-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

describe('Cat Service Test', () => {
  //* success service and repository
  let service: CatService;
  let repository: Repository<CatEntity>;

  //! failed service and repository
  let failedService: CatService;
  let failedRepository: Repository<CatEntity>;

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

    //! failed service and repository
    const failedModule = await Test.createTestingModule({
      providers: [
        CatService,
        {
          provide: getRepositoryToken(CatEntity),
          useValue: mockFailedRepository,
        },
      ],
    }).compile();

    failedService = failedModule.get<CatService>(CatService);
    failedRepository = failedModule.get<Repository<CatEntity>>(
      getRepositoryToken(CatEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('add cat info', () => {
    it('[SUCC]should successfully insert a cat', async () => {
      const addCatSpyOn = jest.spyOn(repository, 'insert');
      const retVal = await service.addCat(addCatDto);

      expect(addCatSpyOn).toBeCalledWith(addCatDto);
      expect(retVal).toBeUndefined();
    });

    it('[FAIL]should occurred exception', async () => {
      expect(failedService.addCat(addCatDto)).rejects.toThrow();
    });
  });

  describe('get cat info by owner id', () => {
    it('[SUCC]should return an array of cats by owner id', async () => {
      // console.log(await service.getCatByOwnerId('joa_mother'));
      expect(await service.getCatByOwnerId('joa_mother')).toStrictEqual(
        getCatByOwnerIdResp,
      );
    });

    it('[FAIL]should occurred exception', async () => {
      expect(
        failedService.getCatByOwnerId('joa_fail_mother'),
      ).rejects.toThrow();
    });
  });

  describe('update cat info', () => {
    it('[SUCC]should successfully update a cat', async () => {
      const updateCatSpyOn = jest.spyOn(repository, 'update');
      const retVal = await service.updateCat(1, updateCatDto);

      expect(updateCatSpyOn).toBeCalledWith(
        { id: 1 },
        {
          name: updateCatDto.name,
          sex: updateCatDto.sex,
          birthedAt: updateCatDto.birthedAt,
        },
      );
      expect(retVal).toBeUndefined();
    });

    it('[FAIL]not found', async () => {
      jest
        .spyOn(repository, 'update')
        .mockResolvedValue({ generatedMaps: [], raw: [], affected: 0 });

      expect(service.updateCat(1, updateCatDto)).rejects.toThrow(
        new NotFoundException(),
      );
    });

    it('[FAIL]should occurred exception', async () => {
      expect(failedService.updateCat(1, updateCatDto)).rejects.toThrow();
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

// get cat info by owner id
const getCatByOwnerIdResp: CatEntity[] = [
  {
    id: 2,
    ownerId: 'joa_mother',
    name: 'joa',
    sex: 1,
    birthedAt: new Date('2022-08-14T15:00:00.000Z'),
    deletedAt: null,
  },
];

// update cat dto
const updateCatDto: UpdateCatDto = {
  name: 'joa_2',
  ownerId: 'joa_mother_2',
  sex: 0,
  birthedAt: new Date('2022-08-15 00:00:00'),
};

const mockRepository = {
  insert: jest.fn().mockImplementation((req: CatEntity) => Promise.resolve()),
  find: jest.fn().mockResolvedValue(getCatByOwnerIdResp),
  update: jest
    .fn()
    .mockResolvedValue({ generatedMaps: [], raw: [], affected: 1 }),
};

const mockFailedRepository = {
  insert: jest.fn().mockRejectedValue({}),
  find: jest.fn().mockRejectedValue({}),
  update: jest.fn().mockRejectedValue({}),
};
