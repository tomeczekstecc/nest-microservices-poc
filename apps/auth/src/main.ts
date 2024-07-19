import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {

  const app = await NestFactory.create(AuthModule);

  app.connectMicroservice({ transport: Transport.TCP });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');

  app.useLogger(app.get(Logger));

  await app.startAllMicroservices()

  await app.listen(PORT, () => console.log('Auh service s2tawwd wwe' + PORT));
}

bootstrap();
