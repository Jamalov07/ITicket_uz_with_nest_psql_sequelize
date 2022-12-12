import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  @IsNumber()
  ticket_id: number;
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;
  @IsNotEmpty()
  @IsDateString()
  createdAt: Date;
  @IsNotEmpty()
  @IsDateString()
  finishedAt: Date;
  @IsNotEmpty()
  @IsNumber()
  status_id: number;
}
