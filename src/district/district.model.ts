import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface DistrictAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'district' })
export class District extends Model<District, DistrictAttrs> {
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
}
