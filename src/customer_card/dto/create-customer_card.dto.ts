import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerCardDto {
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  number: string;
  @IsNotEmpty()
  @IsString()
  year: string;
  @IsNotEmpty()
  @IsString()
  month: string;
}
