import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: {
      origin: true,
      credentials: true,
    },
  });
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  // app.useLogger(app.get(Logger));
  app.use(cookieParser());
  app.enableCors({
    origin: true,
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  });
  await app.listen(configService.getOrThrow('PORT'));
}
bootstrap();
