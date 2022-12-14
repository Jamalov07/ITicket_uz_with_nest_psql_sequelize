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
import { Customer_address } from './customer_address.model';
import { CustomerAddressService } from './customer_address.service';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';

@ApiTags('Customer addresses')
@Controller('customer-address')
export class CustomerAddressController {
  constructor(
    private readonly customerAddressService: CustomerAddressService,
  ) {}

  @ApiOperation({ summary: 'customer address create' })
  @ApiResponse({ status: 200, type: Customer_address })
  @Post()
  create(@Body() createCustomerAddressDto: CreateCustomerAddressDto) {
    return this.customerAddressService.create(createCustomerAddressDto);
  }

  @ApiOperation({ summary: 'customer address get all' })
  @ApiResponse({ status: 200, type: [Customer_address] })
  @Get()
  findAll() {
    return this.customerAddressService.findAll();
  }

  @ApiOperation({ summary: 'customer address get  one' })
  @ApiResponse({ status: 200, type: Customer_address })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerAddressService.findOne(+id);
  }

  @ApiOperation({ summary: 'customer address edit' })
  @ApiResponse({ status: 200, type: Customer_address })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerAddressDto: UpdateCustomerAddressDto,
  ) {
    return this.customerAddressService.update(+id, updateCustomerAddressDto);
  }

  @ApiOperation({ summary: 'customer address delete' })
  @ApiResponse({ status: 200, type: Customer_address })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerAddressService.remove(+id);
  }
}
