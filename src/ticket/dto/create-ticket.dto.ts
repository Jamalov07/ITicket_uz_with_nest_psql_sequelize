import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTicketDto {
  @IsNotEmpty()
  @IsNumber()
  event_id: number;
  @IsNotEmpty()
  @IsNumber()
  seat_id: number;
  @IsNotEmpty()
  @IsNumber()
  price: number;
  @IsNotEmpty()
  @IsNumber()
  service_fee: number;
  @IsNotEmpty()
  @IsNumber()
  status_id: number;
  @IsNotEmpty()
  @IsNumber()
  ticket_type: number;
}
