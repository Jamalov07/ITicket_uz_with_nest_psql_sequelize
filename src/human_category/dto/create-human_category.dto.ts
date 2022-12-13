import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateHumanCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  start_age: number;
  @IsNotEmpty()
  @IsNumber()
  finish_age: number;
  @IsNotEmpty()
  @IsNumber()
  gender_id: number;
}
