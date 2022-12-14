import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'unikal ID' })
  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_id: number;
  @BelongsTo(() => Venue)
  venue: Venue;

  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({ type: DataType.STRING, allowNull: false })
  venue_photo: string;
}
