import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';

interface Event_typeAttrs {
  name: string;
  parent_event_type_id: number;
}

@Table({ tableName: 'event_types' })
export class Event_type extends Model<Event_type, Event_typeAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => Event_type)
  @Column({ type: DataType.INTEGER, allowNull: false })
  parent_event_type_id: number;
  @BelongsTo(() => Event_type)
  event_type: Event_type;

  @HasMany(() => Event_type)
  event_types: Event_type[];
}
