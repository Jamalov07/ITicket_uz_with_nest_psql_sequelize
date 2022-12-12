import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CartAttrs {
  ticket_id: number;
  customer_id: number;
  createdAt: Date;
  finishedAt: Date;
  status_id: number;
}

@Table({ tableName: 'carts' })
export class Cart extends Model<Cart, CartAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  ticket_id: number;

  @Column({ type: DataType.INTEGER })
  customer_id: number;

  @Column({ type: DataType.DATE, defaultValue: Date.now() })
  createdAt: Date;

  @Column({ type: DataType.DATE })
  finishedAt: Date;

  @Column({ type: DataType.INTEGER })
  status_id: number;
}
