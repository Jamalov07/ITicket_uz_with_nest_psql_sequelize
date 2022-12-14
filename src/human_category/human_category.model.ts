import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Gender } from '../gender/gender.model';

interface Human_categoryAttrs {
  name: string;
  start_age: number;
  finish_age: number;
  gender_id: number;
}

@Table({ tableName: 'human_categories' })
export class Human_Category extends Model<Human_Category, Human_categoryAttrs> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'name', description: 'name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: '12', description: 'age' })
  @Column({ type: DataType.INTEGER, defaultValue: 7 })
  start_age: number;

  @ApiProperty({ example: '32', description: 'age' })
  @Column({ type: DataType.INTEGER, defaultValue: 70 })
  finish_age: number;

  @ApiProperty({ example: '1', description: 'gender ID' })
  @ForeignKey(() => Gender)
  @Column({ type: DataType.INTEGER, allowNull: false })
  gender_id: number;
  @BelongsTo(() => Gender)
  gender: Gender;
}
