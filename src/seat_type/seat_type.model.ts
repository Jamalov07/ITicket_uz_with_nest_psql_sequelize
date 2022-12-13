import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Seat_TypeAttrs {
  name: string;
}

@Table({ tableName: 'seat_types' })
export class Seat_Type extends Model<Seat_Type, Seat_TypeAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
}
