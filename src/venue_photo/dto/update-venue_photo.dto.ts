// import { PartialType } from '@nestjs/mapped-types';
// import { CreateVenuePhotoDto } from './create-venue_photo.dto';

// export class UpdateVenuePhotoDto extends PartialType(CreateVenuePhotoDto) {}


import { IsOptional, IsNumber, IsString } from 'class-validator';

export class UpdateVenuePhotoDto {
  @IsOptional()
  @IsNumber()
  venue_id?: number;
  @IsOptional()
  @IsString()
  venue_photo?: string;
}
