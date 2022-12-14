import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Delivery_methodAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'delivery_method' })
export class Delivery_method extends Model<
  Delivery_method,
  Delivery_methodAttrs
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

  @ApiProperty({ example: 'descr', description: 'info' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;
}
