import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Discount_couponAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'discount_coupon' })
export class Discount_coupon extends Model<Discount_coupon, Discount_couponAttrs> {
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
}
