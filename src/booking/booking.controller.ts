import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../guards/jwtAdmin.guard';
import { CustomerGuard } from '../guards/jwtCutomer.guard';
import { Booking } from './booking.model';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';

ApiTags('Bookings');
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: 'Booking create' })
  @ApiResponse({ status: 200, type: Booking })
  @UseGuards(CustomerGuard)
  @Post()
  create(@Body() createBookingDto: CreateBookingDto) {
    return this.bookingService.create(createBookingDto);
  }

  @ApiOperation({ summary: 'get all bookings' })
  @ApiResponse({ status: 200, type: Booking })
  @UseGuards(AdminGuard)
  @Get()
  findAll() {
    return this.bookingService.findAll();
  }

  @ApiOperation({ summary: 'get one booking' })
  @ApiResponse({ status: 200, type: Booking })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingService.findOne(+id);
  }

  @ApiOperation({ summary: 'edit booking' })
  @ApiResponse({ status: 200, type: Booking })
  @UseGuards(AdminGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookingDto: UpdateBookingDto) {
    return this.bookingService.update(+id, updateBookingDto);
  }

  @ApiOperation({ summary: 'delete booking' })
  @ApiResponse({ status: 200, type: Booking })
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bookingService.remove(+id);
  }
}
