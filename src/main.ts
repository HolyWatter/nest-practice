import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //cors 설정
  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(8000);
}
bootstrap();
