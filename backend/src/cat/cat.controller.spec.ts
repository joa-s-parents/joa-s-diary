import { Test } from '@nestjs/testing';

import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { AddCatDto } from './dto/add-cat.dto';
import { GetCatByOwnerIdDto } from './dto/get-cat-by-owner.dto';
import { CatEntity } from './entities/cat.entity';

describe('CatController', () => {
  let controller: CatController;
  let service: CatService;

  let failedController: CatController;
  let failedService: CatService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        CatService,
        {
          provide: CatService,
          useValue: mockCatService,
        },
      ],
    }).compile();

    controller = module.get<CatController>(CatController);
    service = module.get<CatService>(CatService);

    const failedModule = await Test.createTestingModule({
      controllers: [CatController],
      providers: [
        CatService,
        {
          provide: CatService,
          useValue: mockCatFailedService,
        },
      ],
    }).compile();

    failedController = failedModule.get<CatController>(CatController);
    failedService = failedModule.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('add cat info', () => {
    it('[SUCC]should create a cat', async () => {
      expect(controller.addCat(addCatDto)).resolves.not.toThrow();
      expect(service.addCat).toHaveBeenCalledWith(addCatDto);
    });
  });

  describe('get cat info by owner id', () => {
    it('[SUCC]should get cat info by owner id', async () => {
      expect(
        await controller.getCatByOwnerId(getCatByOwnerIdDto),
      ).toStrictEqual(mockGetCatByOwnerId);
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

// get cat by owner id dto
const getCatByOwnerIdDto: GetCatByOwnerIdDto = {
  ownerId: 'joa_mother',
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

// Cat Service Succeed Case Mocking
const mockCatService = {
  addCat: jest.fn().mockImplementation((req: AddCatDto) =>
    Promise.resolve({
      name: 'joa',
      ownerId: 'joa_father',
      sex: 1,
      birthedAt: '2022-08-15 00:00:00',
    }),
  ),
  getCatByOwnerId: jest
    .fn()
    .mockImplementation((req: GetCatByOwnerIdDto) =>
      Promise.resolve(mockGetCatByOwnerId),
    ),
};

// Cat Service Succeed Failed Mocking
const mockCatFailedService = {
  addCat: jest.fn().mockRejectedValue({}),
  getCatByOwnerId: jest.fn().mockRejectedValue({}),
};
