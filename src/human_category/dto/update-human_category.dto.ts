// import { PartialType } from '@nestjs/mapped-types';
// import { CreateHumanCategoryDto } from './create-human_category.dto';

// export class UpdateHumanCategoryDto extends PartialType(CreateHumanCategoryDto) {}

import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateHumanCategoryDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsNumber()
  start_age?: number;
  @IsOptional()
  @IsNumber()
  finish_age?: number;
  @IsOptional()
  @IsNumber()
  gender_id?: number;
}
