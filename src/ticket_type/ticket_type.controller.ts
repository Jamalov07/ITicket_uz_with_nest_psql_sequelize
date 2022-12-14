import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TicketTypeService } from './ticket_type.service';
import { CreateTicketTypeDto } from './dto/create-ticket_type.dto';
import { UpdateTicketTypeDto } from './dto/update-ticket_type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Ticket_type } from './ticket_type.model';

@ApiTags('ticket_type')
@Controller('ticket-type')
export class TicketTypeController {
  constructor(private readonly ticketTypeService: TicketTypeService) {}

  @ApiOperation({ summary: 'tickettype  create' })
  @ApiResponse({ status: 200, type: Ticket_type })
  @Post()
  create(@Body() createTicketTypeDto: CreateTicketTypeDto) {
    return this.ticketTypeService.create(createTicketTypeDto);
  }

  @ApiOperation({ summary: 'tickettype  get all' })
  @ApiResponse({ status: 200, type: [Ticket_type] })
  @Get()
  findAll() {
    return this.ticketTypeService.findAll();
  }

  @ApiOperation({ summary: 'tickettype  get one' })
  @ApiResponse({ status: 200, type: Ticket_type })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketTypeService.findOne(+id);
  }

  @ApiOperation({ summary: 'tickettype  edit' })
  @ApiResponse({ status: 200, type: Ticket_type })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
  ) {
    return this.ticketTypeService.update(+id, updateTicketTypeDto);
  }

  @ApiOperation({ summary: 'tickettype  delete' })
  @ApiResponse({ status: 200, type: Ticket_type })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketTypeService.remove(+id);
  }
}
