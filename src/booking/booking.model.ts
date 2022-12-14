import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Cart } from '../cart/cart.model';
import { Delivery_method } from '../delivery_method/delivery_method.model';
import { Discount_coupon } from '../discount_coupon/discount_coupon.model';
import { Payment_method } from '../payment_method/payment_method.model';
import { Status } from '../status/status.model';

interface BookingAttrs {
  cart_id: number;
  createdAt: Date;
  finishedAt: Date;
  payment_method_id: number;
  delivery_method_id: number;
  discount_coupon_id: number;
  status_id: number;
}

@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking, BookingAttrs> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'cart_id' })
  @ForeignKey(() => Cart)
  @Column({ type: DataType.INTEGER, allowNull: false })
  cart_id: number;
  @BelongsTo(() => Cart)
  cart: Cart;

  @ApiProperty({ example: '1213-13-13', description: 'vaqt' })
  @Column({ type: DataType.DATE, defaultValue: Date.now() })
  createdAt: Date;

  @ApiProperty({ example: '1213-13-13', description: 'vaqt' })
  @Column({ type: DataType.DATE })
  finishedAt: Date;

  @ApiProperty({ example: '1', description: 'pay_met_id' })
  @ForeignKey(() => Payment_method)
  @Column({ type: DataType.INTEGER })
  payment_method_id: number;
  @BelongsTo(() => Payment_method)
  paymnet_method: Payment_method;

  @ApiProperty({ example: '1', description: 'delivery_id' })
  @ForeignKey(() => Delivery_method)
  @Column({ type: DataType.INTEGER })
  delivery_method_id: number;
  @BelongsTo(() => Delivery_method)
  delivery_method: Delivery_method;

  @ApiProperty({ example: '1', description: 'discount_id' })
  @ForeignKey(() => Discount_coupon)
  @Column({ type: DataType.INTEGER })
  discount_coupon_id: number;
  @BelongsTo(() => Discount_coupon)
  discount_coupon: Discount_coupon;

  @ApiProperty({ example: '1', description: 'statusi' })
  @ForeignKey(() => Status)
  @Column({ type: DataType.INTEGER })
  status_id: number;
  @BelongsTo(() => Status)
  status: Status;
}
