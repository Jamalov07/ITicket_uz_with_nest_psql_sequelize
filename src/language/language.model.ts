import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface LanguageAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'language' })
export class Language extends Model<Language, LanguageAttrs> {
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
