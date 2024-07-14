import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigmodule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [NestConfigmodule.forRoot({
    validationSchema: Joi.object({
      MONGODB_URI: Joi.string().required(),
    }),
  })],
  providers: [ConfigService],
  exports: [ConfigService],
})
export class ConfigModule {

}
