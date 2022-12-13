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
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Ticket)
  @Column({ type: DataType.INTEGER, allowNull: false })
  ticket_id: number;
  @BelongsTo(() => Ticket)
  ticket: Ticket;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER })
  customer_id: number;
  @BelongsTo(() => Customer)
  customer: Customer;

  @Column({ type: DataType.DATE, defaultValue: Date.now() })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  finishedAt: Date;

  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER })
  status_id: number;
  @BelongsTo(() => Status)
  status: Status;
}
