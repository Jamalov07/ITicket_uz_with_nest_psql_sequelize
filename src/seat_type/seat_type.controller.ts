import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SeatTypeService } from './seat_type.service';
import { CreateSeatTypeDto } from './dto/create-seat_type.dto';
import { UpdateSeatTypeDto } from './dto/update-seat_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Seat_Type } from './seat_type.model';

@ApiTags('seat_type')
@Controller('seat-type')
export class SeatTypeController {
  constructor(private readonly seatTypeService: SeatTypeService) {}

  @ApiOperation({ summary: 'seattype  create' })
  @ApiResponse({ status: 200, type: Seat_Type })
  @Post()
  create(@Body() createSeatTypeDto: CreateSeatTypeDto) {
    return this.seatTypeService.create(createSeatTypeDto);
  }

  @ApiOperation({ summary: 'seattype  get all' })
  @ApiResponse({ status: 200, type: [Seat_Type] })
  @Get()
  findAll() {
    return this.seatTypeService.findAll();
  }

  @ApiOperation({ summary: 'seattype  get one' })
  @ApiResponse({ status: 200, type: Seat_Type })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seatTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'seattype  edit' })
  @ApiResponse({ status: 200, type: Seat_Type })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSeatTypeDto: UpdateSeatTypeDto,
  ) {
    return this.seatTypeService.update(+id, updateSeatTypeDto);
  }

  @ApiOperation({ summary: 'seattype  delete' })
  @ApiResponse({ status: 200, type: Seat_Type })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seatTypeService.remove(+id);
  }
}
