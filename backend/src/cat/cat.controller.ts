import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
} from '@nestjs/common';

import { CatService } from './cat.service';
import { AddCatDto } from './dto/add-cat.dto';
import { GetCatByOwnerIdDto } from './dto/get-cat-by-owner.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  /**
   * [POST] add cat info
   * @param {AddCatDto} addCatDto cat info
   */
  @Post()
  addCat(@Body() addCatDto: AddCatDto) {
    return this.catService.addCat(addCatDto);
  }

  /**
   * [GET] get cat info by owner id
   * @param {GetCatByOwnerIdDto} getCatByOwnerIdDto owner id
   * @returns {<Promise>CatEntity[]}                cat info
   */
  @Get('/owner/:ownerId')
  getCatByOwnerId(
    @Param() getCatByOwnerIdDto: GetCatByOwnerIdDto,
  ): Promise<CatEntity[]> {
    return this.catService.getCatByOwnerId(getCatByOwnerIdDto.ownerId);
  }

  @Put(':id')
  updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catService.updateCat(id, updateCatDto);
  }
}
