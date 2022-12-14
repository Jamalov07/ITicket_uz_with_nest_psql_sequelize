import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Event } from '../event/event.model';
import { Seat } from '../seat/seat.model';
import { Status } from '../status/status.model';
import { Ticket_type } from '../ticket_type/ticket_type.model';

interface TicketAttrs {
  event_id: number;
  seat_id: number;
  price: number;
  service_fee: number;
  status_id: number;
  ticket_type: number;
}

@Table({ tableName: 'tickets' })
export class Ticket extends Model<Ticket, TicketAttrs> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'event', description: 'unikal ID' })
  @ForeignKey(() => Event)
  @Column({ type: DataType.INTEGER, allowNull: false })
  event_id: number;
  @BelongsTo(() => Event)
  event: Event;

  @ApiProperty({ example: 'seat', description: 'unikal ID' })
  @ForeignKey(() => Seat)
  @Column({ type: DataType.INTEGER, allowNull: false })
  seat_id: number;
  @BelongsTo(() => Seat)
  seat: Seat;

  @ApiProperty({ example: 'servicefee', description: 'unikal ID' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  service_fee: number;

  @ApiProperty({ example: 'status ', description: 'unikal ID' })
  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER, allowNull: false })
  status_id: number;
  @BelongsTo(() => Status)
  status: Status;

  @ApiProperty({ example: 'ticket type', description: 'unikal ID' })
  @ForeignKey(() => Ticket_type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ticket_type: number;
  @BelongsTo(() => Ticket_type)
  ticketType: Ticket_type;
}
