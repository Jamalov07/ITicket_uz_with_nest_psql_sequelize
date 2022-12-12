import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerAddressDto {
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  country_id: number;
  @IsNotEmpty()
  @IsNumber()
  region_id: number;
  @IsNotEmpty()
  @IsNumber()
  district_id: number;
  @IsNotEmpty()
  @IsString()
  street: string;
  @IsNotEmpty()
  @IsString()
  house: string;
  @IsNotEmpty()
  @IsNumber()
  flat: number;
  @IsNotEmpty()
  @IsString()
  location: string;
  @IsNotEmpty()
  @IsString()
  post_index: string;
  @IsNotEmpty()
  @IsString()
  info: string;
}
