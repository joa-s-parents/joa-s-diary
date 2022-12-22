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
}
