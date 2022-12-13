import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './event.model';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event)
    private customerCardRepo: typeof Event,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const candidate = await this.customerCardRepo.findOne({
      where: { ...createEventDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newEvent = await this.customerCardRepo.create(createEventDto);
    return newEvent;
  }

  async findAll() {
    const events = await this.customerCardRepo.findAll();
    if (!events) {
      throw new BadRequestException('Events not found');
    }
    return events;
  }

  async findOne(id: number) {
    const event = await this.customerCardRepo.findOne({
      where: { id: id },
    });
    if (!event) {
      throw new BadRequestException('Event not found');
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const event = await this.customerCardRepo.findOne({
      where: { id: id },
    });
    if (!event) {
      throw new BadRequestException('Event not found');
    }

    const candidate = await this.customerCardRepo.findOne({
      where: { ...updateEventDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedEvent = await (
      await this.customerCardRepo.update(updateEventDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedEvent;
  }

  async remove(id: number) {
    const Event = await this.customerCardRepo.findOne({
      where: { id: id },
    });
    if (!Event) {
      throw new BadRequestException('Event not found');
    }
    await this.customerCardRepo.destroy({ where: { id: id } });

    return { message: 'Event deleted', Event };
  }
}
