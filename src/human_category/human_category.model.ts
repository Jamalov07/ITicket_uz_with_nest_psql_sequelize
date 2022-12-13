import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface Human_categoryAttrs {
  name: string;
  start_age: number;
  finish_age: number;
  gender_id: number;
}

@Table({ tableName: 'human_categories' })
export class Human_Category extends Model<Human_Category, Human_categoryAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @Column({ type: DataType.INTEGER, defaultValue: 7 })
  start_age: number;
  @Column({ type: DataType.INTEGER, defaultValue: 70 })
  finish_age: number;
  @Column({ type: DataType.INTEGER, allowNull: false })
  gender_id: number;
}
