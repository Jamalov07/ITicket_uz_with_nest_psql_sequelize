// import { PartialType } from '@nestjs/mapped-types';
// import { CreateGenderDto } from './create-gender.dto';

// export class UpdateGenderDto extends PartialType(CreateGenderDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateGenderDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
