import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Booking } from '../booking/booking.model';
import { Cart } from '../cart/cart.model';
import { Customer } from '../customer/customer.model';
import { Ticket } from '../ticket/ticket.model';

interface StatusAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'status' })
export class Status extends Model<Status, StatusAttrs> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name', description: 'unikal ID' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'info', description: 'unikal ID' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  // @HasMany(() => Customer)
  // customers: Customer[];

  @HasMany(() => Booking)
  bookings: Booking[];

  @HasMany(() => Cart)
  carts: Cart[];

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
