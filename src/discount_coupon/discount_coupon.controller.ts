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
import { Discount_coupon } from './discount_coupon.model';
import { DiscountCouponService } from './discount_coupon.service';
import { CreateDiscountCouponDto } from './dto/create-discount_coupon.dto';
import { UpdateDiscountCouponDto } from './dto/update-discount_coupon.dto';

@ApiTags('Discount_coupon')
@Controller('discount-coupon')
export class DiscountCouponController {
  constructor(private readonly discountCouponService: DiscountCouponService) {}

  @ApiOperation({ summary: 'discount coupon  create' })
  @ApiResponse({ status: 200, type: Discount_coupon })
  @Post()
  create(@Body() createDiscountCouponDto: CreateDiscountCouponDto) {
    return this.discountCouponService.create(createDiscountCouponDto);
  }

  @ApiOperation({ summary: 'discount coupon  get all' })
  @ApiResponse({ status: 200, type: [Discount_coupon] })
  @Get()
  findAll() {
    return this.discountCouponService.findAll();
  }

  @ApiOperation({ summary: 'discount coupon  get one' })
  @ApiResponse({ status: 200, type: Discount_coupon })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.discountCouponService.findOne(+id);
  }

  @ApiOperation({ summary: 'discount coupon  edit' })
  @ApiResponse({ status: 200, type: Discount_coupon })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDiscountCouponDto: UpdateDiscountCouponDto,
  ) {
    return this.discountCouponService.update(+id, updateDiscountCouponDto);
  }

  @ApiOperation({ summary: 'discount coupon  delete' })
  @ApiResponse({ status: 200, type: Discount_coupon })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.discountCouponService.remove(+id);
  }
}
