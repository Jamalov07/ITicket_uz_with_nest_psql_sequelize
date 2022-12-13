import { Column, DataType, Model, Table } from 'sequelize-typescript';

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

  @Column({ type: DataType.INTEGER, allowNull: false })
  name: string;
  @Column({ type: DataType.STRING, allowNull: false })
  photo: string;
  @Column({ type: DataType.DATE, allowNull: false })
  start_date: Date;
  @Column({ type: DataType.STRING, allowNull: false })
  start_time: string;
  @Column({ type: DataType.DATE, allowNull: false })
  finish_date: Date;
  @Column({ type: DataType.STRING, allowNull: false })
  finish_time: string;
  @Column({ type: DataType.STRING, allowNull: false })
  info: string;
  @Column({ type: DataType.INTEGER, allowNull: false })
  event_type_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  human_category_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_id: number;
  @Column({ type: DataType.INTEGER })
  lang_id: number;
  @Column({ type: DataType.DATE, allowNull: false })
  release_date: Date;
}
