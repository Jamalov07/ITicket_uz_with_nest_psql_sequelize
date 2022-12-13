// import { PartialType } from '@nestjs/mapped-types';
// import { CreateEventTypeDto } from './create-event_type.dto';

// export class UpdateEventTypeDto extends PartialType(CreateEventTypeDto) {}


import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateEventTypeDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsNumber()
  parent_event_type_id?: number;
}
