import { Column, DataType, Model, Table } from 'sequelize-typescript';

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
  row_nubmer: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  number: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_id: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  seat_type_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  location_is_schema: string;
}
