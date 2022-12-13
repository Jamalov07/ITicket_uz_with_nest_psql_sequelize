import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

interface Payment_methodAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'payment_method' })
export class Payment_method extends Model<Payment_method, Payment_methodAttrs> {
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
