import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { Seat } from './seat.model';

@Injectable()
export class SeatService {
  constructor(
    @InjectModel(Seat)
    private seatRepo: typeof Seat,
  ) {}

  async create(createSeatDto: CreateSeatDto) {
    const candidate = await this.seatRepo.findOne({
      where: { ...createSeatDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newSeat = await this.seatRepo.create(createSeatDto);
    return newSeat;
  }

  async findAll() {
    const seats = await this.seatRepo.findAll();
    if (!seats) {
      throw new BadRequestException('Seats not found');
    }
    return seats;
  }

  async findOne(id: number) {
    const seat = await this.seatRepo.findOne({
      where: { id: id },
    });
    if (!seat) {
      throw new BadRequestException('Seat not found');
    }
    return seat;
  }

  async update(id: number, updateSeatDto: UpdateSeatDto) {
    const seat = await this.seatRepo.findOne({
      where: { id: id },
    });
    if (!seat) {
      throw new BadRequestException('Seat not found');
    }

    const candidate = await this.seatRepo.findOne({
      where: { ...updateSeatDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedSeat = await (
      await this.seatRepo.update(updateSeatDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedSeat;
  }

  async remove(id: number) {
    const Seat = await this.seatRepo.findOne({
      where: { id: id },
    });
    if (!Seat) {
      throw new BadRequestException('Seat not found');
    }
    await this.seatRepo.destroy({ where: { id: id } });

    return { message: 'Seat deleted', Seat };
  }
}
