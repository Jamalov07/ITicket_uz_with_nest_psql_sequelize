import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Customer } from '../customer/customer.model';

interface LanguageAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'language' })
export class Language extends Model<Language, LanguageAttrs> {
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

  @ApiProperty({ example: 'info', description: 'info' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Customer)
  customers: Customer[];
}
