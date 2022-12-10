import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SampleService } from '@sample/sample.service';
import { CreateSampleDto } from '@sample/dto/create-sample.dto';
import { UpdateSampleDto } from '@sample/dto/update-sample.dto';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Post()
  create(@Body() createSampleDto: CreateSampleDto) {
    return this.sampleService.create(createSampleDto);
  }

  @Get()
  findAll() {
    return this.sampleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampleService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampleDto: UpdateSampleDto) {
    return this.sampleService.update(+id, updateSampleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampleService.remove(+id);
  }
}
