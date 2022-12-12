import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface CustomerAttrs {
  first_name: string;
  last_name: string;
  phone: string;
  hashed_password: string;
  email: string;
  birth_date: Date;
  gender_id: number;
  lang_id: number;
  hashed_refresh_token: string;
}

@Table({ tableName: 'customers' })
export class Customer extends Model<Customer, CustomerAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  first_name: string;

  @Column({ type: DataType.STRING })
  last_name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  phone: string;

  @Column({ type: DataType.STRING, allowNull: false })
  hashed_password: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column({ type: DataType.DATE })
  birth_date: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  gender_id: number;

  @Column({ type: DataType.INTEGER })
  lang_id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  hashed_refresh_token: string;
}
