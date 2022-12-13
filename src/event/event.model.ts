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
  photo: string;
  @Column({ type: DataType.DATE, allowNull: false })
  start_date: Date;
  @Column({ type: DataType.TIME, allowNull: false })
  start_time: string;
  @Column({ type: DataType.DATE, allowNull: false })
  finish_date: Date;
  @Column({ type: DataType.TIME, allowNull: false })
  finish_time: string;
  @Column({ type: DataType.STRING, allowNull: false })
  info: string;

  @ForeignKey(() => Event_type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  event_type_id: number;
  @BelongsTo(() => Event_type)
  event_type: Event_type;

  @ForeignKey(() => Human_Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  human_category_id: number;
  @BelongsTo(() => Human_Category)
  human_category: Human_Category;

  @ForeignKey(() => Venue)
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_id: number;
  @BelongsTo(() => Venue)
  venue: Venue;

  @ForeignKey(() => Language)
  @Column({ type: DataType.INTEGER })
  lang_id: number;
  @BelongsTo(() => Language)
  language: Language;

  @Column({ type: DataType.DATE, allowNull: false })
  release_date: Date;

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
