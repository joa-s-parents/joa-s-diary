import { Module } from '@nestjs/common';
import { SampleService } from '@sample/sample.service';
import { SampleController } from '@sample/sample.controller';

@Module({
  controllers: [SampleController],
  providers: [SampleService],
})
export class SampleModule {}
