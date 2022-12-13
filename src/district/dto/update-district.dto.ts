// import { PartialType } from '@nestjs/mapped-types';
// import { CreateDistrictDto } from './create-district.dto';

// export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
