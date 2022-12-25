import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, QueryFailedError, Repository } from 'typeorm';

import { AddCatDto } from './dto/add-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

@Injectable()
export class CatService {
  private readonly logger = new Logger(CatService.name);

  constructor(
    @InjectRepository(CatEntity)
    private readonly catRepository: Repository<CatEntity>,
  ) {}

  /**
   * insert cat info
   * @param {AddCatDto} addCatDto cat info
   */
  async addCat(addCatDto: AddCatDto): Promise<void> {
    await this.catRepository
      .insert(addCatDto)
      .catch((error: QueryFailedError) => {
        this.logger.error(`insert cat query failed. ${error}`);
        throw new InternalServerErrorException({
          message: `database query failed`,
        });
      });
  }

  /**
   * get cat info by owner id
   * @param {string} ownerId       owner id
   * @returns {Promise<CatEntity>} cat info
   */
  async getCatByOwnerId(ownerId: string): Promise<CatEntity[]> {
    return await this.catRepository
      .find({ where: { ownerId, deletedAt: IsNull() } })
      .catch((error: QueryFailedError) => {
        this.logger.error(`get cat query failed. ${error}`);
        throw new InternalServerErrorException({
          message: `database query failed`,
        });
      });
  }

  /**
   * update cat info
   * @param {number} id                 cat id
   * @param {UpdateCatDto} updateCatDto update cat info
   */
  async updateCat(id: number, updateCatDto: UpdateCatDto) {
    const result = await this.catRepository
      .update(
        { id: id },
        {
          name: updateCatDto.name,
          sex: updateCatDto.sex,
          birthedAt: updateCatDto.birthedAt,
        },
      )
      .catch((error: QueryFailedError) => {
        this.logger.error(`update cat query failed. ${error}`);
        throw new InternalServerErrorException({
          message: `database query failed`,
        });
      });

    if (result.affected < 1) {
      throw new NotFoundException();
    }

    return;
  }

  /**
   * delete cat info(update deleted_at column)
   * @param {number} id cat id
   */
  async deleteCat(id: number) {
    const result = await this.catRepository
      .update({ id: id }, { deletedAt: new Date() })
      .catch((error: QueryFailedError) => {
        this.logger.error(
          `delete cat query failed(update deleted_at field). ${error}`,
        );
        throw new InternalServerErrorException({
          message: `database query failed`,
        });
      });

    if (result.affected < 1) {
      throw new NotFoundException();
    }

    return;
  }
}
