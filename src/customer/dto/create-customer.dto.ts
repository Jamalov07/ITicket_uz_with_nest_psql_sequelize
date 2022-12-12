import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  first_name: string;
  @IsNotEmpty()
  @IsString()
  last_name: string;
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone: string;
  @IsNotEmpty()
  @IsString()
  hashed_password: string;
  @IsNotEmpty()
  @IsEmail()
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
}
