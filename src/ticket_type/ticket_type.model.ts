import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Ticket_typeAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'ticket_type' })
export class Ticket_type extends Model<Ticket_type, Ticket_typeAttrs> {
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
  description: string;
}
