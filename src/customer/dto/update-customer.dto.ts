// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCustomerDto } from './create-customer.dto';

// export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}


import { IsDateString, IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  first_name: string;
  @IsOptional()
  @IsString()
  last_name: string;
  @IsOptional()
  @IsString()
  phone: string;
  @IsOptional()
  @IsString()
  hashed_password: string;
  @IsOptional()
  @IsString()
  email: string;
  @IsOptional()
  @IsDateString()
  birth_date: Date;
  @IsOptional()
  @IsNumber()
  gender_id: number;
  @IsOptional()
  @IsNumber()
  lang_id: number;
  @IsOptional()
  @IsString()
  hashed_refresh_token: string;
}
