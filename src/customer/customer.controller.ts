import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { cookieGetter } from '../decorators/cookieGetter.decorator';
import { LoginCustomer } from '../types/loginCustomer.type';
import { Customer } from './customer.model';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customers')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiOperation({ summary: 'customer create' })
  @ApiResponse({ status: 200, type: Customer })
  @Post()
  create(
    @Body() createCustomerDto: CreateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.create(createCustomerDto, res);
  }

  @ApiOperation({ summary: 'customer login' })
  @ApiResponse({ status: 200, type: Customer })
  @Post('login')
  loginCustomer(
    @Body() custBody: LoginCustomer,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.login(custBody, res);
  }

  @ApiOperation({ summary: 'customer logout' })
  @ApiResponse({ status: 200, type: Customer })
  @Post('logout')
  logout(
    @cookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.logout(refreshToken, res);
  }

  @ApiOperation({ summary: 'customer refresh' })
  @ApiResponse({ status: 200, type: Customer })
  @Post(':id/refresh')
  refreshToken(
    @Param('id') id: string,
    @cookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.refreshToken(+id, refreshToken, res);
  }

  @ApiOperation({ summary: 'customer get all' })
  @ApiResponse({ status: 200, type: [Customer] })
  @Get()
  findAll() {
    return this.customerService.findAll();
  }

  @ApiOperation({ summary: 'customer get one' })
  @ApiResponse({ status: 200, type: Customer })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(+id);
  }

  @ApiOperation({ summary: 'customer edit' })
  @ApiResponse({ status: 200, type: Customer })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.customerService.update(+id, updateCustomerDto, res);
  }

  @ApiOperation({ summary: 'customer delete' })
  @ApiResponse({ status: 200, type: Customer })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
