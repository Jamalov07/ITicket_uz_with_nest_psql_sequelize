// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCustomerCardDto } from './create-customer_card.dto';

// export class UpdateCustomerCardDto extends PartialType(CreateCustomerCardDto) {}

import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateCustomerCardDto {
  @IsOptional()
  @IsNumber()
  customer_id?: number;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  phone?: string;
  @IsOptional()
  @IsString()
  number?: string;
  @IsOptional()
  @IsString()
  year?: string;
  @IsOptional()
  @IsString()
  month?: string;
}
