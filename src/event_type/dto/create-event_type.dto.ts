import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateEventTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  parent_event_type_id: number;
}
