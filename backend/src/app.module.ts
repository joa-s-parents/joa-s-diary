import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatModule } from './cat/cat.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ConfigModule as MyConfigModule } from './config/config.module';
import { ConfigOrmService } from './config/config.orm.service';
import { LoggerMiddleware } from './middleware/logger.middleware';

@Module({
  imports: [
    MyConfigModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useClass: ConfigOrmService,
      inject: [ConfigOrmService],
    }),
    CatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
