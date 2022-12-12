// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCustomerDto } from './create-customer.dto';

// export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}

import {
  IsDateString,
  IsOptional,
  IsNumber,
  IsString,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';
export class UpdateCustomerDto {
  @IsOptional()
  @IsString()
  first_name?: string;
  @IsOptional()
  @IsString()
  last_name?: string;
  @IsOptional()
  @IsPhoneNumber('UZ')
  phone?: string;
  @IsOptional()
  @IsString()
  hashed_password?: string;
  @IsOptional()
  @IsEmail()
  email?: string;
  @IsOptional()
  @IsDateString()
  birth_date?: Date;
  @IsOptional()
  @IsNumber()
  gender_id?: number;
  @IsOptional()
  @IsNumber()
  lang_id?: number;
}
