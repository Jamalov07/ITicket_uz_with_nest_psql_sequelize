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
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Customer id' })
  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customer_id: number;
  @BelongsTo(() => Customer)
  customer: Customer;

  @ApiProperty({ example: '1', description: 'name ' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '123434253', description: 'phone' })
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ApiProperty({ example: '122', description: 'number' })
  @Column({ type: DataType.STRING, allowNull: false })
  number: string;

  @ApiProperty({ example: '111', description: 'year' })
  @Column({ type: DataType.STRING, allowNull: false })
  year: string;

  @ApiProperty({ example: '11', description: 'month' })
  @Column({ type: DataType.STRING, allowNull: false })
  month: string;

  @ApiProperty({ example: true, description: 'true' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_active: boolean;

  @ApiProperty({ example: true, description: 'true' })
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  is_main: boolean;
}
