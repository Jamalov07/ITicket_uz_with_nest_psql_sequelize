import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { VenuePhotoService } from './venue_photo.service';
import { CreateVenuePhotoDto } from './dto/create-venue_photo.dto';
import { UpdateVenuePhotoDto } from './dto/update-venue_photo.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Venue_photo } from './venue_photo.model';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('venue_photo')
@Controller('venue-photo')
export class VenuePhotoController {
  constructor(private readonly venuePhotoService: VenuePhotoService) {}

  @ApiOperation({ summary: 'venuephoto  create' })
  @ApiResponse({ status: 200, type: Venue_photo })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() createVenuePhotoDto: CreateVenuePhotoDto,
    @UploadedFile() image,
  ) {
    return this.venuePhotoService.create(createVenuePhotoDto, image);
  }

  @ApiOperation({ summary: 'venuephoto  get all' })
  @ApiResponse({ status: 200, type: [Venue_photo] })
  @Get()
  findAll() {
    return this.venuePhotoService.findAll();
  }

  @ApiOperation({ summary: 'venuephoto  get one' })
  @ApiResponse({ status: 200, type: Venue_photo })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuePhotoService.findOne(+id);
  }

  @ApiOperation({ summary: 'venuephoto  edit' })
  @ApiResponse({ status: 200, type: Venue_photo })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateVenuePhotoDto: UpdateVenuePhotoDto,
    @UploadedFile() image,
  ) {
    return this.venuePhotoService.update(+id, updateVenuePhotoDto, image);
  }

  @ApiOperation({ summary: 'venuephoto  delete' })
  @ApiResponse({ status: 200, type: Venue_photo })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venuePhotoService.remove(+id);
  }
}
