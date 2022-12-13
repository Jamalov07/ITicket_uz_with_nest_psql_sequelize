import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DistrictAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictAttrs> {
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
