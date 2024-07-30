import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { CreateChargeDto } from '@app/common/dto/create-charge.dto';

@Injectable()
export class PaymentsService {

  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  private readonly stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'), {
    apiVersion: '2024-06-20',
    // apiVersion: '2022-11-15',
  });

  async createCharge(
    {
      // card,
      amount,
    }: CreateChargeDto) {


    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      // payment_method: paymentMethod.id,
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      // payment_method_types: ['card'],
      currency: 'pln',
      return_url:  'http://localhost:3000/success',
    });

    return paymentIntent;

  }

}
