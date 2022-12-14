import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VenueTypeService } from './venue_type.service';
import { CreateVenueTypeDto } from './dto/create-venue_type.dto';
import { UpdateVenueTypeDto } from './dto/update-venue_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Venue_type } from './venue_type.model';

@ApiTags('vene_type')
@Controller('venue-type')
export class VenueTypeController {
  constructor(private readonly venueTypeService: VenueTypeService) {}

  @ApiOperation({ summary: 'venuetype  create' })
  @ApiResponse({ status: 200, type: Venue_type })
  @Post()
  create(@Body() createVenueTypeDto: CreateVenueTypeDto) {
    return this.venueTypeService.create(createVenueTypeDto);
  }

  @ApiOperation({ summary: 'venuetype  get all' })
  @ApiResponse({ status: 200, type: [Venue_type] })
  @Get()
  findAll() {
    return this.venueTypeService.findAll();
  }

  @ApiOperation({ summary: 'venuetype  get one' })
  @ApiResponse({ status: 200, type: Venue_type })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'venuetype  edit' })
  @ApiResponse({ status: 200, type: Venue_type })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateVenueTypeDto: UpdateVenueTypeDto,
  ) {
    return this.venueTypeService.update(+id, updateVenueTypeDto);
  }

  @ApiOperation({ summary: 'venuetype  delete' })
  @ApiResponse({ status: 200, type: Venue_type })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueTypeService.remove(+id);
  }
}
