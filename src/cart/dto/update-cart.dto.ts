// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCartDto } from './create-cart.dto';

// export class UpdateCartDto extends PartialType(CreateCartDto) {}

import { IsDateString, IsOptional, IsNumber } from 'class-validator';

export class UpdateCartDto {
  @IsOptional()
  @IsNumber()
  ticket_id: number;
  @IsOptional()
  @IsNumber()
  customer_id: number;
  @IsOptional()
  @IsDateString()
  createdAt: Date;
  @IsOptional()
  @IsDateString()
  finishedAt: Date;
  @IsOptional()
  @IsNumber()
  status_id: number;
}
