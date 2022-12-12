// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCustomerAddressDto } from './create-customer_address.dto';

// export class UpdateCustomerAddressDto extends PartialType(CreateCustomerAddressDto) {}

import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateCustomerAddressDto {
  @IsOptional()
  @IsNumber()
  customer_id?: number;
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsNumber()
  country_id?: number;
  @IsOptional()
  @IsNumber()
  region_id?: number;
  @IsOptional()
  @IsNumber()
  district_id?: number;
  @IsOptional()
  @IsString()
  street?: string;
  @IsOptional()
  @IsString()
  house?: string;
  @IsOptional()
  @IsNumber()
  flat?: number;
  @IsOptional()
  @IsString()
  location?: string;
  @IsOptional()
  @IsString()
  post_index?: string;
  @IsOptional()
  @IsString()
  info?: string;
}
