import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CountryAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'countries' })
export class Country extends Model<Country, CountryAttrs> {
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
