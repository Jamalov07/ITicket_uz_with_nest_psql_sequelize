import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Customer_address } from '../customer_address/customer_address.model';

interface CountryAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'countries' })
export class Country extends Model<Country, CountryAttrs> {
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

  @ApiProperty({ example: 'info', description: 'desc' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Customer_address)
  customers: Customer_address[];
}
