import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'admin', description: 'name' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({ example: 'admin12', description: 'login' })
  @Column({ type: DataType.STRING, allowNull: false })
  login: string;

  @ApiProperty({ example: 'amin111', description: 'password ' })
  @Column({ type: DataType.STRING, allowNull: false })
  hashed_password: string;

  @ApiProperty({ example: true, description: 'tekshiruv' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_active: boolean;

  @ApiProperty({ example: true, description: 'tekshiruv' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  is_creator: boolean;

  @ApiProperty({ example: null, description: 'token' })
  @Column({ type: DataType.STRING })
  hashed_refresh_token: string;
}
