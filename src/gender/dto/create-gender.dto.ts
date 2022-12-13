import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenderDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
