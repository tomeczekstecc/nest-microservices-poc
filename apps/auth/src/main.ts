import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  const PORT = 3001;

  app.useLogger(app.get(Logger));

  await app.listen(PORT, () => console.log('Auh service started o por2t e' + PORT));
}

bootstrap();
