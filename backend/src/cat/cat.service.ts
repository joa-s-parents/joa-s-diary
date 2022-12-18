import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, QueryFailedError, Repository } from 'typeorm';

import { AddCatDto } from './dto/add-cat.dto';
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
    const catEntity: CatEntity = {
      name: addCatDto.name,
      ownerId: addCatDto.ownerId,
      sex: addCatDto.sex,
      birthedAt: addCatDto.birthedAt,
    };

    await this.catRepository
      .insert(catEntity)
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
}
