import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsNotEmpty()
  @IsString()
  hashed_password: string;
  @IsNotEmpty()
  @IsString()
  email: string;
  @IsNotEmpty()
  @IsDateString()
  birth_date: Date;
  @IsNotEmpty()
  @IsNumber()
  gender_id: number;
  @IsNotEmpty()
  @IsNumber()
  lang_id: number;
  @IsNotEmpty()
  @IsString()
  hashed_refresh_token: string;
}
