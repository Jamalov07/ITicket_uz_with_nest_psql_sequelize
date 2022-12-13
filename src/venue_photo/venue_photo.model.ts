import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Venue_photoAttrs {
  venue_id: number;
  venue_photo: string;
}

@Table({ tableName: 'venue_photos' })
export class Venue_photo extends Model<Venue_photo, Venue_photoAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  venue_id: number;
  @Column({ type: DataType.STRING, allowNull: false })
  venue_photo: string;
}
