import { NestFactory } from '@nestjs/core';
import { ReservationsModule } from './reservations.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(ReservationsModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const PORT = 3000;

  app.useLogger(app.get(Logger));
  await app.listen(PORT, () => {

    console.log('Reservations has started on port99w2 ' + PORT);
  });
}

bootstrap();
