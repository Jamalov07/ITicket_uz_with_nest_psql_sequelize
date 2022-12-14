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
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Event } from './event.model';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('event')
@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: 'event create' })
  @ApiResponse({ status: 200, type: Event })
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createEventDto: CreateEventDto, @UploadedFile() image) {
    return this.eventService.create(createEventDto, image);
  }

  @ApiOperation({ summary: 'event get all' })
  @ApiResponse({ status: 200, type: [Event] })
  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @ApiOperation({ summary: 'event get one' })
  @ApiResponse({ status: 200, type: Event })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @ApiOperation({ summary: 'event update' })
  @ApiResponse({ status: 200, type: Event })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @UploadedFile() image,
  ) {
    return this.eventService.update(+id, updateEventDto, image);
  }

  @ApiOperation({ summary: 'event delete' })
  @ApiResponse({ status: 200, type: Event })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}
