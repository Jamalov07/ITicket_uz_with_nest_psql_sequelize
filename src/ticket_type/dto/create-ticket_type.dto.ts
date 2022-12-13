import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTicketTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
