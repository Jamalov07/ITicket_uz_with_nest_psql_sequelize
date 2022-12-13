import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { Seat_Type } from './seat_type.model';

@Injectable()
export class SeatTypeService {
  constructor(
    @InjectModel(Seat_Type)
    private seat_typeRepo: typeof Seat_Type,
  ) {}

  async create(createSeat_typeDto: CreateSeatTypeDto) {
    const candidate = await this.seat_typeRepo.findOne({
      where: { ...createSeat_typeDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newSeat_type = await this.seat_typeRepo.create(createSeat_typeDto);
    return newSeat_type;
  }

  async findAll() {
    const seat_types = await this.seat_typeRepo.findAll({
      include: { all: true },
    });
    if (!seat_types) {
      throw new BadRequestException('Seat_types not found');
    }
    return seat_types;
  }

  async findOne(id: number) {
    const seat_type = await this.seat_typeRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!seat_type) {
      throw new BadRequestException('Seat_type not found');
    }
    return seat_type;
  }

  async update(id: number, updateSeat_typeDto: UpdateSeatTypeDto) {
    const seat_type = await this.seat_typeRepo.findOne({
      where: { id: id },
    });
    if (!seat_type) {
      throw new BadRequestException('Seat_type not found');
    }

    const candidate = await this.seat_typeRepo.findOne({
      where: { ...updateSeat_typeDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedSeat_type = await (
      await this.seat_typeRepo.update(updateSeat_typeDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedSeat_type;
  }

  async remove(id: number) {
    const Seat_type = await this.seat_typeRepo.findOne({
      where: { id: id },
    });
    if (!Seat_type) {
      throw new BadRequestException('Seat_type not found');
    }
    await this.seat_typeRepo.destroy({ where: { id: id } });

    return { message: 'Seat_type deleted', Seat_type };
  }
}
