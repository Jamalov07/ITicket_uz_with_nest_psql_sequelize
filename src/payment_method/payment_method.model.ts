import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface Payment_methodAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'payment_method' })
export class Payment_method extends Model<Payment_method, Payment_methodAttrs> {
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
