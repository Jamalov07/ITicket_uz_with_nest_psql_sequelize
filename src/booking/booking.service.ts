import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

@Injectable()
export class BookingService {
  constructor(@InjectModel(Booking) private bookingRepo: typeof Booking) {}
  async create(createBookingDto: CreateBookingDto) {
    const candidate = await this.bookingRepo.findOne({
      where: { cart_id: createBookingDto.cart_id },
    });
    if (candidate) {
      throw new BadRequestException('this card already axists in database');
    }
    const newBooking = await this.bookingRepo.create(createBookingDto);
    return newBooking;
  }

  async findAll() {
    const bookings = await this.bookingRepo.findAll();
    if (!bookings) {
      throw new BadRequestException('bookings not found');
    }
    return bookings;
  }

  async findOne(id: number) {
    const booking = await this.bookingRepo.findOne({ where: { id: id } });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    const booking = await this.bookingRepo.findOne({ where: { id: id } });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    if (updateBookingDto.cart_id) {
      const candidate = await this.bookingRepo.findOne({
        where: { cart_id: updateBookingDto.cart_id },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This cart already exists');
      }
    }
    const updatedBooking = await (
      await this.bookingRepo.update(updateBookingDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedBooking;
  }

  async remove(id: number) {
    const booking = await this.bookingRepo.findOne({ where: { id: id } });
    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
    return { message: 'booking deleted', booking };
  }
}
