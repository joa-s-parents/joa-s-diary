import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CatService } from './cat.service';
import { AddCatDto } from './dto/add-cat.dto';
import { GetCatByOwnerIdDto } from './dto/get-cat-by-owner.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { CatEntity } from './entities/cat.entity';

@ApiTags('cat')
@Controller('cat')
export class CatController {
  constructor(private readonly catService: CatService) {}

  /**
   * [POST] add cat info
   * @param {AddCatDto} addCatDto cat info
   */
  @ApiResponse({
    status: 201,
    description: 'add cat info',
  })
  @ApiResponse({ status: 500, description: 'internal server error occurred.' })
  @Post()
  addCat(@Body() addCatDto: AddCatDto) {
    return this.catService.addCat(addCatDto);
  }

  /**
   * [GET] get cat info by owner id
   * @param {GetCatByOwnerIdDto} getCatByOwnerIdDto owner id
   * @returns {<Promise>CatEntity[]}                cat info
   */
  @ApiResponse({
    status: 200,
    description: 'get cat info',
  })
  @ApiResponse({ status: 500, description: 'internal server error occurred.' })
  @Get('/owner/:ownerId')
  getCatByOwnerId(
    @Param() getCatByOwnerIdDto: GetCatByOwnerIdDto,
  ): Promise<CatEntity[]> {
    return this.catService.getCatByOwnerId(getCatByOwnerIdDto.ownerId);
  }

  /**
   * [PUT] update cat info
   * @param {number} id                 cat id
   * @param {UpdateCatDto} updateCatDto update cat info
   */
  @ApiResponse({
    status: 200,
    description: 'update cat info',
  })
  @ApiResponse({ status: 404, description: 'not found cat info.' })
  @ApiResponse({ status: 500, description: 'internal server error occurred.' })
  @Put(':id')
  updateCat(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCatDto: UpdateCatDto,
  ) {
    return this.catService.updateCat(id, updateCatDto);
  }

  /**
   * [DELETE] delete cat info
   * @param {number} id cat id
   */
  @ApiResponse({
    status: 200,
    description: 'delete cat info',
  })
  @ApiResponse({ status: 404, description: 'not found cat info.' })
  @ApiResponse({ status: 500, description: 'internal server error occurred.' })
  @Delete(':id')
  deleteCat(@Param('id', ParseIntPipe) id: number) {
    return this.catService.deleteCat(id);
  }
}
