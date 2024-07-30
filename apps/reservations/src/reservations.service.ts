import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './reservations/dto/create-reservation.dto';
import { UpdateReservationDto } from './reservations/dto/update-reservation.dto';
import { ReservationsRepository } from './reservations.repository';
import { PAYMENTS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {

  constructor(
    private readonly reservationRepository: ReservationsRepository,
    @Inject(PAYMENTS_SERVICE) private readonly paymentService: ClientProxy,
  ) {
  }

  // async create(createReservationDto: CreateReservationDto, userId: string) {
  //   this.paymentService.send('create_charge', createReservationDto.charge)
  //     .subscribe(async (response) => {
  //
  //       console.log(response)
  //       const reservation = await this.reservationRepository
  //         .create({
  //           ...createReservationDto,
  //           timestamp: new Date(),
  //           userId,
  //         });
  //
  //     });
  // }


  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map((res) => {
          console.log(res, 'ressssssssssssssssssssssssssssssssssssssssssssss');
          return this.reservationRepository
            .create({
              ...createReservationDto,
              invoiceId: res.id,
              timestamp: new Date(),
              userId,
            });

        }));
  }

  async findAll() {
    return this.reservationRepository.find({});
  }

  async findOne(_id: string) {
    return this.reservationRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepository.findOneAndUpdate({ _id }, { $set: updateReservationDto });
  }

  async remove(_id: string) {
    return this.reservationRepository.findOneAndDelete({ _id });
  }
}
