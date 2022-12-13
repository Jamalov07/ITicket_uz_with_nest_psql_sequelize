import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface VenueAttrs {
  name: string;
  address: string;
  location: string;
  site: string;
  phone: string;
  venue_type_id: number;
  schema: string;
  region_id: number;
  district_id: number;
}

@Table({ tableName: 'venues' })
export class Venue extends Model<Venue, VenueAttrs> {
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
  address: string;
  @Column({ type: DataType.STRING, allowNull: false })
  location: string;
  @Column({ type: DataType.STRING, allowNull: false })
  site: string;
  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_type_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  schema: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  region_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  district_id: number;
}
