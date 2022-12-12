// import { PartialType } from '@nestjs/mapped-types';
// import { CreateAdminDto } from './create-admin.dto';

// export class UpdateAdminDto extends PartialType(CreateAdminDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  login?: string;
  @IsOptional()
  @IsString()
  hashed_password?: string;
}
