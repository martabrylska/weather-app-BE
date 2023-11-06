import { NestFactory } from '@nestjs/core';
import {NestExpressApplication} from "@nestjs/platform-express";
import {ValidationPipe} from "@nestjs/common";
import helmet from "helmet";
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());
  // (app as NestExpressApplication).use(helmet());
  app.useGlobalPipes(new ValidationPipe({
    // disableErrorMessages: true,
    // whitelist: true,
    // forbidNonWhitelisted: true,
    transform: true,
  }));
  await app.listen(3001);
}
bootstrap();
