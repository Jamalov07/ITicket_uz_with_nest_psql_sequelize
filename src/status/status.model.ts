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
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  // @HasMany(() => Customer)
  // customers: Customer[];
  
  @HasMany(() => Booking)
  bookings: Booking[];

  @HasMany(() => Cart)
  carts:Cart[];

  @HasMany(() => Ticket)
  tickets: Ticket[];


}
