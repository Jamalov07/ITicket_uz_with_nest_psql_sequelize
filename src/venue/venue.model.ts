import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { District } from '../district/district.model';
import { Region } from '../region/region.model';
import { Seat } from '../seat/seat.model';
import { Ticket } from '../ticket/ticket.model';
import { Venue_type } from '../venue_type/venue_type.model';

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

  @ForeignKey(() => Venue_type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_type_id: number;
  @BelongsTo(() => Venue_type)
  venue: Venue_type;

  @Column({ type: DataType.STRING, allowNull: false })
  schema: string;

  @ForeignKey(() => Region)
  @Column({ type: DataType.INTEGER, allowNull: false })
  region_id: number;
  @BelongsTo(() => Region)
  region: Region;

  @ForeignKey(() => District)
  @Column({ type: DataType.INTEGER, allowNull: false })
  district_id: number;
  @BelongsTo(() => District)
  district: District;

  @HasMany(() => Seat)
  seats: Seat[];
}
