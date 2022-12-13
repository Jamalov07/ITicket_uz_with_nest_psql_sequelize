// import { PartialType } from '@nestjs/mapped-types';
// import { CreateTicketTypeDto } from './create-ticket_type.dto';

// export class UpdateTicketTypeDto extends PartialType(CreateTicketTypeDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateTicketTypeDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
