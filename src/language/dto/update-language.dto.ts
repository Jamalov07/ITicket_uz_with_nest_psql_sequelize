// import { PartialType } from '@nestjs/mapped-types';
// import { CreateLanguageDto } from './create-language.dto';

// export class UpdateLanguageDto extends PartialType(CreateLanguageDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateLanguageDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
