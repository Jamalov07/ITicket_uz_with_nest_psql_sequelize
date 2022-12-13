import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface TicketAttrs {
  event_id: number;
  seat_id: number;
  price: number;
  service_fee: number;
  status_id: number;
  ticket_type: number;
}

@Table({ tableName: 'tickets' })
export class Ticket extends Model<Ticket, TicketAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  event_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  seat_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  price: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  service_fee: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  status_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  ticket_type: number;
}
