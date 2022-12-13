import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Venue } from '../venue/venue.model';

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

  @HasMany(() => Venue)
  venues: Venue[];
}
