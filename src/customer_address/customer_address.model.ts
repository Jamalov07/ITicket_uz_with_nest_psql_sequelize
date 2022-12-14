import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Country } from '../country/country.model';
import { Customer } from '../customer/customer.model';
import { District } from '../district/district.model';
import { Region } from '../region/region.model';

interface Customer_addressAttrs {
  customer_id: number;
  name: string;
  country_id: number;
  region_id: number;
  district_id: number;
  street: string;
  house: string;
  flat: number;
  location: string;
  post_index: string;
  info: string;
}

@Table({ tableName: 'customer_address' })
export class Customer_address extends Model<
  Customer_address,
  Customer_addressAttrs
> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'customer id' })
  @ForeignKey(() => Customer)
  @Column({ type: DataType.INTEGER, allowNull: false })
  customer_id: number;
  @BelongsTo(() => Customer)
  customer: Customer;

  @ApiProperty({ example: 'name', description: 'name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '1', description: 'country ID' })
  @ForeignKey(() => Country)
  @Column({ type: DataType.INTEGER, allowNull: false })
  country_id: number;
  @BelongsTo(() => Country)
  country: Country;

  @ApiProperty({ example: '1', description: 'region ID' })
  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: false })
  region_id: number;
  @BelongsTo(() => Region)
  region: Region;

  @ApiProperty({ example: '1', description: 'district ID' })
  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER, allowNull: false })
  district_id: number;
  @BelongsTo(() => District)
  district: District;

  @ApiProperty({ example: '12ww', description: 'street name' })
  @Column({ type: DataType.STRING, allowNull: false })
  street: string;

  @ApiProperty({ example: '12', description: 'house' })
  @Column({ type: DataType.STRING, allowNull: false })
  house: string;

  @ApiProperty({ example: '3', description: 'number' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  flat: number;

  @ApiProperty({ example: '...', description: 'i dont know' })
  @Column({ type: DataType.STRING, allowNull: false })
  location: string;

  @ApiProperty({ example: '...', description: 'i dont know too' })
  @Column({ type: DataType.STRING, allowNull: false })
  post_index: string;

  @ApiProperty({ example: 'info', description: 'descrption' })
  @Column({ type: DataType.STRING, allowNull: false })
  info: string;
}
