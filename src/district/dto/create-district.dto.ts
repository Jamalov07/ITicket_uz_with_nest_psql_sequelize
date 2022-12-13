import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDistrictDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
