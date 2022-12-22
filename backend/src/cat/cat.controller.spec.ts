import { InternalServerErrorException } from '@nestjs/common';
import { Test } from '@nestjs/testing';

import { CatController } from './cat.controller';
import { CatService } from './cat.service';
import { AddCatDto } from './dto/add-cat.dto';
import { GetCatByOwnerIdDto } from './dto/get-cat-by-owner.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

describe('Cat Controller Test', () => {
  let controller: CatController;
  let service: CatService;

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
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('add cat info', () => {
    it('[SUCC]should create a cat', async () => {
      controller.addCat(addCatDto);

      expect(service.addCat).toHaveBeenCalledWith(addCatDto);
    });

    it('[FAIL]interval server error', async () => {
      jest
        .spyOn(service, 'addCat')
        .mockRejectedValue(new InternalServerErrorException());

      expect(controller.addCat(addCatDto)).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });
  });

  describe('get cat info by owner id', () => {
    it('[SUCC]should get cat info by owner id', async () => {
      expect(
        await controller.getCatByOwnerId(getCatByOwnerIdDto),
      ).toStrictEqual(getCatByOwnerIdResp);
    });

    it('[FAIL]interval server error', async () => {
      jest
        .spyOn(service, 'getCatByOwnerId')
        .mockRejectedValue(new InternalServerErrorException());

      expect(controller.getCatByOwnerId(getCatByOwnerIdDto)).rejects.toThrow(
        new InternalServerErrorException(),
      );
    });
  });

  describe('update cat info', () => {
    it('[SUCC]should update a cat', async () => {
      controller.updateCat(1, updateCatDto);

      expect(service.updateCat).toHaveBeenCalledWith(1, updateCatDto);
    });

    it('[FAIL]interval server error', async () => {
      jest
        .spyOn(service, 'updateCat')
        .mockRejectedValue(new InternalServerErrorException());

      expect(controller.updateCat(1, updateCatDto)).rejects.toThrow(
        new InternalServerErrorException(),
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

// get cat by owner id dto
const getCatByOwnerIdDto: GetCatByOwnerIdDto = {
  ownerId: 'joa_mother',
};

// get cat by owner id response
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

// Cat Service Succeed Case Mocking
const mockCatService = {
  addCat: jest.fn(),
  getCatByOwnerId: jest
    .fn()
    .mockImplementation((req: GetCatByOwnerIdDto) =>
      Promise.resolve(getCatByOwnerIdResp),
    ),
  updateCat: jest.fn(),
};
