import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ConfigService } from './config/config.service';
import { setupSwagger } from './swagger/swagger.setup';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true, // whitelist 설정을 켜서 걸러질 속성이 있다면 아예 요청 자체를 막도록 (400 에러)
      transform: true, // 요청에서 넘어온 자료들의 형변환
    }),
  );

  //* configuration
  const configService = app.get(ConfigService);
  const port = (await configService.get('PORT')) || 3001;

  // * Swagger //

  setupSwagger(app);

  // * Swagger //

  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`Joa's diary api server is running on: ${await app.getUrl()}`);
}
bootstrap();
