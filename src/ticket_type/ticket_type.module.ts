import { Module } from '@nestjs/common';
import { TicketTypeService } from './ticket_type.service';
import { TicketTypeController } from './ticket_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Ticket_type } from './ticket_type.model';

@Module({
  imports: [SequelizeModule.forFeature([Ticket_type])],
  controllers: [TicketTypeController],
  providers: [TicketTypeService],
})
export class TicketTypeModule {}
