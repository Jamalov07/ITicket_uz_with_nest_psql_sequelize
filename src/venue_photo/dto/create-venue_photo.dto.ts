import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateVenuePhotoDto {
  @IsNotEmpty()
  @IsNumber()
  venue_id: number;
  @IsNotEmpty()
  @IsString()
  venue_photo: string;
}
