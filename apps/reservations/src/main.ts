import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const configService = app.get(ConfigService);

  const PORT = configService.get('PORT');


  app.useLogger(app.get(Logger));
  await app.listen(PORT, () => {

    console.log('Reservations has started on port9wwwrrrrrrrrrr ' + PORT);
  });
}

bootstrap();
