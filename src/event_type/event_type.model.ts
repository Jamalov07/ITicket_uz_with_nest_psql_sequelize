import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  @Column({ type: DataType.INTEGER, allowNull: false })
  parent_event_type_id: number;
}
