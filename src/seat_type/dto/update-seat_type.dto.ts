// import { PartialType } from '@nestjs/mapped-types';
// import { CreateSeatTypeDto } from './create-seat_type.dto';

// export class UpdateSeatTypeDto extends PartialType(CreateSeatTypeDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateSeatTypeDto {
  @IsOptional()
  @IsString()
  name?: string;
}
