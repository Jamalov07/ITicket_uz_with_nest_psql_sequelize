import { forwardRef, Module } from '@nestjs/common';
import { VenuePhotoService } from './venue_photo.service';
import { VenuePhotoController } from './venue_photo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Venue_photo } from './venue_photo.model';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [
    forwardRef(() => FilesModule),
    SequelizeModule.forFeature([Venue_photo]),
  ],
  controllers: [VenuePhotoController],
  providers: [VenuePhotoService],
})
export class VenuePhotoModule {}
