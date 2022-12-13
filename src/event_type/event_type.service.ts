import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateEventTypeDto } from './dto/create-event_type.dto';
import { UpdateEventTypeDto } from './dto/update-event_type.dto';
import { Event_type } from './event_type.model';

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(Event_type)
    private eventTypeRepo: typeof Event_type,
  ) {}

  async create(createEvent_typeDto: CreateEventTypeDto) {
    const candidate = await this.eventTypeRepo.findOne({
      where: { ...createEvent_typeDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newEvent_type = await this.eventTypeRepo.create(createEvent_typeDto);
    return newEvent_type;
  }

  async findAll() {
    const event_types = await this.eventTypeRepo.findAll({ include: { all: true } });
    if (!event_types) {
      throw new BadRequestException('Event_types not found');
    }
    return event_types;
  }

  async findOne(id: number) {
    const event_type = await this.eventTypeRepo.findOne({
      where: { id: id },include: { all: true }
    });
    if (!event_type) {
      throw new BadRequestException('Event_type not found');
    }
    return event_type;
  }

  async update(id: number, updateEvent_typeDto: UpdateEventTypeDto) {
    const event_type = await this.eventTypeRepo.findOne({
      where: { id: id },
    });
    if (!event_type) {
      throw new BadRequestException('Event_type not found');
    }

    const candidate = await this.eventTypeRepo.findOne({
      where: { ...updateEvent_typeDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedEvent_type = await (
      await this.eventTypeRepo.update(updateEvent_typeDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedEvent_type;
  }

  async remove(id: number) {
    const Event_type = await this.eventTypeRepo.findOne({
      where: { id: id },
    });
    if (!Event_type) {
      throw new BadRequestException('Event_type not found');
    }
    await this.eventTypeRepo.destroy({ where: { id: id } });

    return { message: 'Event_type deleted', Event_type };
  }
}
