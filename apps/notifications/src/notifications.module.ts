import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { LoggerModule } from '@app/common';

@Module({
  imports: [

    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/notifications/.env',
      validationSchema: Joi.object({
          PORT: Joi.number().required(),
          EMAIL_USER: Joi.string().required(),
          EMAIL_PASS: Joi.string().required(),
          EMAIL_HOST: Joi.string().required(),
          EMAIL_PORT: Joi.number().required(),
          EMAIL_SECURE: Joi.boolean().required(),
        },
      ),
    }),
    LoggerModule,
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService],
})
export class NotificationsModule {
}
