import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Customer } from '../customer/customer.model';
import { Status } from '../status/status.model';
import { Ticket } from '../ticket/ticket.model';

interface CartAttrs {
  ticket_id: number;
  customer_id: number;
  createdAt: Date;
  finishedAt: Date;
  status_id: number;
}

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart, CartAttrs> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'ticket ID' })
  @ForeignKey(() => Ticket)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ticket_id: number;
  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @ApiProperty({ example: '1', description: 'customer ID' })
  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customer_id: number;
  @BelongsTo(() => Customer)
  customer: Customer;

  @ApiProperty({ example: '1234-23-01', description: 'vaqti' })
  @Column({ type: DataType.DATE, defaultValue: Date.now() })
  createdAt: Date;

  @ApiProperty({ example: '1234-23-01', description: 'vaqti' })
  @Column({ type: DataType.DATE })
  finishedAt: Date;

  @ApiProperty({ example: '1', description: 'status ID' })
  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER })
  status_id: number;
  @BelongsTo(() => Status)
  status: Status;
}
