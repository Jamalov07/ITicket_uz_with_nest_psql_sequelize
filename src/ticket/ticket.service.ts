import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './ticket.model';

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket)
    private ticketRepo: typeof Ticket,
  ) {}

  async create(createticketDto: CreateTicketDto) {
    const candidate = await this.ticketRepo.findOne({
      where: { ...createticketDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newticket = await this.ticketRepo.create(createticketDto);
    return newticket;
  }

  async findAll() {
    const tickets = await this.ticketRepo.findAll();
    if (!tickets) {
      throw new BadRequestException('tickets not found');
    }
    return tickets;
  }

  async findOne(id: number) {
    const ticket = await this.ticketRepo.findOne({
      where: { id: id },
    });
    if (!ticket) {
      throw new BadRequestException('ticket not found');
    }
    return ticket;
  }

  async update(id: number, updateticketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepo.findOne({
      where: { id: id },
    });
    if (!ticket) {
      throw new BadRequestException('ticket not found');
    }

    const candidate = await this.ticketRepo.findOne({
      where: { ...updateticketDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedticket = await (
      await this.ticketRepo.update(updateticketDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedticket;
  }

  async remove(id: number) {
    const ticket = await this.ticketRepo.findOne({
      where: { id: id },
    });
    if (!ticket) {
      throw new BadRequestException('ticket not found');
    }
    await this.ticketRepo.destroy({ where: { id: id } });

    return { message: 'ticket deleted', ticket };
  }
}
