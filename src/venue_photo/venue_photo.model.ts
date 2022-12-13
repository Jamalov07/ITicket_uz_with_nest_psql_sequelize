import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Venue } from '../venue/venue.model';

interface Venue_photoAttrs {
  venue_id: number;
  venue_photo: string;
}

@Table({ tableName: 'venue_photos' })
export class Venue_photo extends Model<Venue_photo, Venue_photoAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_id: number;
  @BelongsTo(() => Venue)
  venue: Venue;

  @Column({ type: DataType.STRING, allowNull: false })
  venue_photo: string;
}
