import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Booking } from '../booking/booking.model';
import { Cart } from '../cart/cart.model';
import { Customer_address } from '../customer_address/customer_address.model';
import { Customer_card } from '../customer_card/customer_card.model';
import { Gender } from '../gender/gender.model';
import { Language } from '../language/language.model';

interface CustomerAttrs {
  first_name: string;
  last_name: string;
  phone: string;
  hashed_password: string;
  email: string;
  birth_date: Date;
  gender_id: number;
  lang_id: number;
  hashed_refresh_token: string;
}

@Table({ tableName: 'customers' })
export class Customer extends Model<Customer, CustomerAttrs> {
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
  first_name: string;

  @ApiProperty({ example: 'last', description: 'lastname' })
  @Column({ type: DataType.STRING })
  last_name: string;

  @ApiProperty({ example: '998979969966', description: 'raqam' })
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @ApiProperty({ example: 'password', description: 'unikal_1D' })
  @Column({ type: DataType.STRING, allowNull: false })
  hashed_password: string;

  @ApiProperty({ example: '@gmail.com', description: 'email' })
  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @ApiProperty({ example: '1234-12-12', description: 'date' })
  @Column({ type: DataType.DATE })
  birth_date: Date;

  @ApiProperty({ example: '1', description: 'jinsi' })
  @ForeignKey(() => Gender)
  @Column({ type: DataType.INTEGER, allowNull: false })
  gender_id: number;
  @BelongsTo(() => Gender)
  gender: Gender;

  @ApiProperty({ example: '1', description: 'tili' })
  @ForeignKey(() => Language)
  @Column({ type: DataType.INTEGER })
  lang_id: number;
  @BelongsTo(() => Language)
  language: Language;

  @ApiProperty({ example: 'token', description: 'token' })
  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;

  @HasMany(() => Cart)
  cart: Cart[];

  @HasMany(() => Customer_card)
  customer_card: Customer_card[];

  // @HasMany(() => Booking)
  // booking: Booking[];

  @HasMany(() => Customer_address)
  customer_address: Customer_address[];
}
