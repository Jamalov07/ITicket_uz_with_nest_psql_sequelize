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
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { CustomerGuard } from '../guards/jwtCutomer.guard';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ticket } from './ticket.model';

@ApiTags('ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiOperation({ summary: 'ticket  create' })
  @ApiResponse({ status: 200, type: Ticket })
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @ApiOperation({ summary: 'ticket  get all' })
  @ApiResponse({ status: 200, type: [Ticket] })
  @UseGuards(CustomerGuard)
  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @ApiOperation({ summary: 'ticket  get one' })
  @ApiResponse({ status: 200, type: Ticket })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @ApiOperation({ summary: 'ticket  edit' })
  @ApiResponse({ status: 200, type: Ticket })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @ApiOperation({ summary: 'ticket  delete' })
  @ApiResponse({ status: 200, type: Ticket })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
