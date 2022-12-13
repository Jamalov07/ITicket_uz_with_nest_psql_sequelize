import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Customer_address } from '../customer_address/customer_address.model';
import { Venue } from '../venue/venue.model';

interface RegionAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'regions' })
export class Region extends Model<Region, RegionAttrs> {
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

  @HasMany(() => Customer_address)
  customers: Customer_address[];

  @HasMany(() => Venue)
  venues: Venue[];
}
