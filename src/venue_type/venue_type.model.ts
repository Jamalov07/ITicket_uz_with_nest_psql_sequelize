import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Venue_typeAttrs {
  name: string;
}

@Table({ tableName: 'venue_types' })
export class Venue_type extends Model<Venue_type, Venue_typeAttrs> {
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
