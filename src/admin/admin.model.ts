import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface AdminAttrs {
  name: string;
  login: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'admins' })
export class Admin extends Model<Admin, AdminAttrs> {
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
  login: string;

  @Column({ type: DataType.STRING, allowNull: false })
  hashed_password: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_creator: boolean;

  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;
}
