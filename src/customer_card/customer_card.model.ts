import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Customer } from '../customer/customer.model';

interface Customer_cardAttrs {
  customer_id: number;
  name: string;
  phone: string;
  number: string;
  year: string;
  month: string;
  is_active: boolean;
  is_main: boolean;
}

@Table({ tableName: 'customer_card' })
export class Customer_card extends Model<Customer_card, Customer_cardAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customer_id: number;
  @BelongsTo(() => Customer)
  customer: Customer;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;
  @Column({ type: DataType.STRING, allowNull: false })
  number: string;
  @Column({ type: DataType.STRING, allowNull: false })
  year: string;
  @Column({ type: DataType.STRING, allowNull: false })
  month: string;
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_main: boolean;
}
