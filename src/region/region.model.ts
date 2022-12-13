import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface RegionAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'regions' })
export class Region extends Model<Region, RegionAttrs> {
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
