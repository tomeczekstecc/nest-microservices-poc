import { Injectable } from '@nestjs/common';
import { NotifyEmailDto } from './dto/notify-email.dto';
import * as  nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {

  constructor(private readonly configService: ConfigService) {
  }

  private readonly transporter = nodemailer.createTransport({
    host: this.configService.get('EMAIL_HOST'),
    port: this.configService.get('EMAIL_PORT'),
    secure: this.configService.get('EMAIL_SECURE'),
    auth: {
      user: this.configService.get('EMAIL_USER'),
      pass: this.configService.get('EMAIL_PASS')+'$',
    },

  });

  async notifyEmail({ email, text }: NotifyEmailDto) {

    try {
      await this.transporter.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'Sleepr Notification',
        text,
      });

    } catch (e){
      console.log(e.message)
    }

  }
}
