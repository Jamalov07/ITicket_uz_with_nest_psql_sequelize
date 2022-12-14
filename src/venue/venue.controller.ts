import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VenueService } from './venue.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Venue } from './venue.model';

@ApiTags('venue')
@Controller('venue')
export class VenueController {
  constructor(private readonly venueService: VenueService) {}

  @ApiOperation({ summary: 'venue  create' })
  @ApiResponse({ status: 200, type: Venue })
  @Post()
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @ApiOperation({ summary: 'venue  get all' })
  @ApiResponse({ status: 200, type: [Venue] })
  @Get()
  findAll() {
    return this.venueService.findAll();
  }

  @ApiOperation({ summary: 'venue  get one' })
  @ApiResponse({ status: 200, type: Venue })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venueService.findOne(+id);
  }

  @ApiOperation({ summary: 'venue  edit' })
  @ApiResponse({ status: 200, type: Venue })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVenueDto: UpdateVenueDto) {
    return this.venueService.update(+id, updateVenueDto);
  }

  @ApiOperation({ summary: 'venue  delete' })
  @ApiResponse({ status: 200, type: Venue })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.venueService.remove(+id);
  }
}
