import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketTypeDto } from './dto/create-ticket_type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket_type.dto';
import { Ticket_type } from './ticket_type.model';

@Injectable()
export class TicketTypeService {
  constructor(
    @InjectModel(Ticket_type)
    private ticketTypeRepo: typeof Ticket_type,
  ) {}
  async create(createticket_typeDto: CreateTicketTypeDto) {
    const candidate = await this.ticketTypeRepo.findOne({
      where: { name: createticket_typeDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newticket_type = await this.ticketTypeRepo.create(
      createticket_typeDto,
    );
    return newticket_type;
  }

  async findAll() {
    const ticket_types = await this.ticketTypeRepo.findAll({
      include: { all: true },
    });
    if (!ticket_types) {
      throw new BadRequestException('ticket_types not found');
    }
    return ticket_types;
  }

  async findOne(id: number) {
    const ticket_type = await this.ticketTypeRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!ticket_type) {
      throw new BadRequestException('ticket_type not found');
    }
    return ticket_type;
  }

  async update(id: number, updateticket_typeDto: UpdateTicketTypeDto) {
    const ticket_type = await this.ticketTypeRepo.findOne({
      where: { id: id },
    });
    if (!ticket_type) {
      throw new BadRequestException('ticket_type not found');
    }
    if (updateticket_typeDto.name) {
      const candidate = await this.ticketTypeRepo.findOne({
        where: { name: updateticket_typeDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updatedticket_type = await (
      await this.ticketTypeRepo.update(updateticket_typeDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedticket_type;
  }

  async remove(id: number) {
    const ticket_type = await this.ticketTypeRepo.findOne({
      where: { id: id },
    });
    if (!ticket_type) {
      throw new BadRequestException('ticket_type not found');
    }
    await this.ticketTypeRepo.destroy({ where: { id: id } });
    return { message: 'ticket_type deleted', ticket_type };
  }
}
