import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Ticket } from '../ticket/ticket.model';

interface Ticket_typeAttrs {
  name: string;
  description: string;
}

@Table({ tableName: 'ticket_type' })
export class Ticket_type extends Model<Ticket_type, Ticket_typeAttrs> {
  @ApiProperty({ example: '1', description: 'unikal ID' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'name', description: 'info' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;
  @ApiProperty({ example: 'desc', description: 'info' })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @HasMany(() => Ticket)
  tickets: Ticket[];
}
