// import { PartialType } from '@nestjs/mapped-types';
// import { CreateStatusDto } from './create-status.dto';

// export class UpdateStatusDto extends PartialType(CreateStatusDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateStatusDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
