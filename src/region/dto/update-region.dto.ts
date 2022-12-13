// import { PartialType } from '@nestjs/mapped-types';
// import { CreateRegionDto } from './create-region.dto';

// export class UpdateRegionDto extends PartialType(CreateRegionDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateRegionDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
