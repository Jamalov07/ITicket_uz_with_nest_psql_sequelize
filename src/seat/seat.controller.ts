import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeatService } from './seat.service';
import { CreateSeatDto } from './dto/create-seat.dto';
import { UpdateSeatDto } from './dto/update-seat.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Seat } from './seat.model';

@ApiTags('seat')
@Controller('seat')
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @ApiOperation({ summary: 'seat  create' })
  @ApiResponse({ status: 200, type: Seat })
  @Post()
  create(@Body() createSeatDto: CreateSeatDto) {
    return this.seatService.create(createSeatDto);
  }

  @ApiOperation({ summary: 'seat  get all' })
  @ApiResponse({ status: 200, type: [Seat] })
  @Get()
  findAll() {
    return this.seatService.findAll();
  }

  @ApiOperation({ summary: 'seat  get one' })
  @ApiResponse({ status: 200, type: Seat })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatService.findOne(+id);
  }

  @ApiOperation({ summary: 'seat  edit' })
  @ApiResponse({ status: 200, type: Seat })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSeatDto: UpdateSeatDto) {
    return this.seatService.update(+id, updateSeatDto);
  }

  @ApiOperation({ summary: 'seat  delete' })
  @ApiResponse({ status: 200, type: Seat })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatService.remove(+id);
  }
}
