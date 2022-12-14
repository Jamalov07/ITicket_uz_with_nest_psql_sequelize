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
import { Event_type } from '../event_type/event_type.model';
import { Human_Category } from '../human_category/human_category.model';
import { Language } from '../language/language.model';
import { Ticket } from '../ticket/ticket.model';
import { Venue } from '../venue/venue.model';

interface EventAttrs {
  name: string;
  photo: string;
  start_date: Date;
  start_time: string;
  finish_date: Date;
  finish_time: string;
  info: string;
  event_type_id: number;
  human_category_id: number;
  venue_id: number;
  lang_id: number;
  release_date: Date;
}

@Table({ tableName: 'events' })
export class Event extends Model<Event, EventAttrs> {
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

  @ApiProperty({ example: '1', description: 'photo ' })
  @Column({ type: DataType.STRING, allowNull: false })
  photo: string;

  @ApiProperty({ example: '1122-12-12', description: 'date' })
  @Column({ type: DataType.DATE, allowNull: false })
  start_date: Date;

  @ApiProperty({ example: '1232-23-23', description: 'date' })
  @Column({ type: DataType.TIME, allowNull: false })
  start_time: string;

  @ApiProperty({ example: '12', description: 'time' })
  @Column({ type: DataType.DATE, allowNull: false })
  finish_date: Date;

  @ApiProperty({ example: '13', description: 'time' })
  @Column({ type: DataType.TIME, allowNull: false })
  finish_time: string;

  @ApiProperty({ example: 'info', description: ' info' })
  @Column({ type: DataType.STRING, allowNull: false })
  info: string;

  @ApiProperty({ example: '1', description: 'event ID' })
  @ForeignKey(() => Event_type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  event_type_id: number;
  @BelongsTo(() => Event_type)
  event_type: Event_type;

  @ApiProperty({ example: '1', description: 'human cate ID' })
  @ForeignKey(() => Human_Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  human_category_id: number;
  @BelongsTo(() => Human_Category)
  human_category: Human_Category;

  @ApiProperty({ example: '1', description: 'venue ID' })
  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_id: number;
  @BelongsTo(() => Venue)
  venue: Venue;

  @ApiProperty({ example: '1', description: 'language ID' })
  @ForeignKey(() => Language)
  @Column({ type: DataType.INTEGER })
  lang_id: number;
  @BelongsTo(() => Language)
  language: Language;

  @ApiProperty({ example: '1111-11-11', description: 'release date' })
  @Column({ type: DataType.DATE, allowNull: false })
  release_date: Date;

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
