import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface GenderAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'gender' })
export class Gender extends Model<Gender, GenderAttrs> {
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
