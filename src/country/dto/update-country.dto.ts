// import { PartialType } from '@nestjs/mapped-types';
// import { CreateCountryDto } from './create-country.dto';

// export class UpdateCountryDto extends PartialType(CreateCountryDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateCountryDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
