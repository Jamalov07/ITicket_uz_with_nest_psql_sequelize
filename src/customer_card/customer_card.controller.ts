import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Customer_card } from './customer_card.model';
import { CustomerCardService } from './customer_card.service';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';

@ApiTags('Customer card')
@Controller('customer-card')
export class CustomerCardController {
  constructor(private readonly customerCardService: CustomerCardService) {}

  @ApiOperation({ summary: 'customer card create' })
  @ApiResponse({ status: 200, type: Customer_card })
  @Post()
  create(@Body() createCustomerCardDto: CreateCustomerCardDto) {
    return this.customerCardService.create(createCustomerCardDto);
  }

  @ApiOperation({ summary: 'customer card get all' })
  @ApiResponse({ status: 200, type: [Customer_card] })
  @Get()
  findAll() {
    return this.customerCardService.findAll();
  }

  @ApiOperation({ summary: 'customer card get one' })
  @ApiResponse({ status: 200, type: Customer_card })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerCardService.findOne(+id);
  }

  @ApiOperation({ summary: 'customer card edit' })
  @ApiResponse({ status: 200, type: Customer_card })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerCardDto: UpdateCustomerCardDto,
  ) {
    return this.customerCardService.update(+id, updateCustomerCardDto);
  }

  @ApiOperation({ summary: 'customer card delete' })
  @ApiResponse({ status: 200, type: Customer_card })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerCardService.remove(+id);
  }
}
