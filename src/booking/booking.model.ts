import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface BookingAttrs {
  cart_id: number;
  createdAt: Date;
  finished: Date;
  payment_method_id: number;
  delivery_method_id: number;
  discount_coupon_id: number;
  status_id: number;
}

@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking, BookingAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  cart_id: number;

  @Column({ type: DataType.DATE, defaultValue: Date.now() })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  finished: Date;

  @Column({ type: DataType.INTEGER })
  payment_method_id: number;

  @Column({ type: DataType.INTEGER })
  delivery_method_id: number;

  @Column({ type: DataType.INTEGER })
  discount_coupon_id: number;

  @Column({ type: DataType.INTEGER })
  status_id: number;
}
