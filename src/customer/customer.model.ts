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
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  hashed_password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.DATE })
  birth_date: Date;

  @ForeignKey(() => Gender)
  @Column({ type: DataType.INTEGER, allowNull: false })
  gender_id: number;
  @BelongsTo(() => Gender)
  gender: Gender;

  @ForeignKey(() => Language)
  @Column({ type: DataType.INTEGER })
  lang_id: number;
  @BelongsTo(() => Language)
  language: Language;

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
