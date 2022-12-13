import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Seat_Type } from '../seat_type/seat_type.model';
import { Venue } from '../venue/venue.model';

interface SeatAttrs {
  sector: number;
  row_number: number;
  number: number;
  venue_id: number;
  seat_type_id: number;
  location_in_schema: string;
}

@Table({ tableName: 'seats' })
export class Seat extends Model<Seat, SeatAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  sector: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  row_number: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  number: number;

  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_id: number;
  @BelongsTo(() => Venue)
  venue: Venue;

  @ForeignKey(()=>Seat_Type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  seat_type_id: number;
  @BelongsTo(() => Seat_Type)
  seat_type: Seat_Type;
  
  @Column({ type: DataType.STRING, allowNull: false })
  location_in_schema: string;
}
