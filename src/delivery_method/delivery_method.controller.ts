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
import { Delivery_method } from './delivery_method.model';
import { DeliveryMethodService } from './delivery_method.service';
import { CreateDeliveryMethodDto } from './dto/create-delivery_method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery_method.dto';

@ApiTags('Delivery method')
@Controller('delivery-method')
export class DeliveryMethodController {
  constructor(private readonly deliveryMethodService: DeliveryMethodService) {}

  @ApiOperation({ summary: 'delivery method create' })
  @ApiResponse({ status: 200, type: Delivery_method })
  @Post()
  create(@Body() createDeliveryMethodDto: CreateDeliveryMethodDto) {
    return this.deliveryMethodService.create(createDeliveryMethodDto);
  }

  @ApiOperation({ summary: 'delivery method get all' })
  @ApiResponse({ status: 200, type: [Delivery_method] })
  @Get()
  findAll() {
    return this.deliveryMethodService.findAll();
  }

  @ApiOperation({ summary: 'delivery method get  one' })
  @ApiResponse({ status: 200, type: Delivery_method })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deliveryMethodService.findOne(+id);
  }

  @ApiOperation({ summary: 'delivery method edit' })
  @ApiResponse({ status: 200, type: Delivery_method })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDeliveryMethodDto: UpdateDeliveryMethodDto,
  ) {
    return this.deliveryMethodService.update(+id, updateDeliveryMethodDto);
  }

  @ApiOperation({ summary: 'delivery method delete' })
  @ApiResponse({ status: 200, type: Delivery_method })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deliveryMethodService.remove(+id);
  }
}
