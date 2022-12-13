import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Delivery_methodAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'delivery_method' })
export class Delivery_method extends Model<Delivery_method, Delivery_methodAttrs> {
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
