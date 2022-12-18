import { Module } from '@nestjs/common';

import { ConfigOrmService } from './config.orm.service';
import { ConfigService } from './config.service';

@Module({
  providers: [ConfigService, ConfigOrmService],
  exports: [ConfigService],
})
export class ConfigModule {}
