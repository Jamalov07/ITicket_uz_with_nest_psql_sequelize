// import { PartialType } from '@nestjs/mapped-types';
// import { CreateTicketDto } from './create-ticket.dto';

// export class UpdateTicketDto extends PartialType(CreateTicketDto) {}

import { IsOptional, IsNumber } from 'class-validator';

export class UpdateTicketDto {
  @IsOptional()
  @IsNumber()
  event_id?: number;
  @IsOptional()
  @IsNumber()
  seat_id?: number;
  @IsOptional()
  @IsNumber()
  price?: number;
  @IsOptional()
  @IsNumber()
  service_fee?: number;
  @IsOptional()
  @IsNumber()
  status_id?: number;
  @IsOptional()
  @IsNumber()
  ticket_type?: number;
}
