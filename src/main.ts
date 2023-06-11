import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { HTTPExceptionFilter } from './common/exceptions/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalFilters(new HTTPExceptionFilter());
  //cors 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
