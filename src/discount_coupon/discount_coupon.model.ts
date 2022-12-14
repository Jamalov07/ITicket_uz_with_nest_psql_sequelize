import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Discount_couponAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'discount_coupon' })
export class Discount_coupon extends Model<
  Discount_coupon,
  Discount_couponAttrs
> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name', description: 'name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'info', description: 'info' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}
