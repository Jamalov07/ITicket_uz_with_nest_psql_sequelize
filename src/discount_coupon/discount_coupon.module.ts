import { Module } from '@nestjs/common';
import { DiscountCouponService } from './discount_coupon.service';
import { DiscountCouponController } from './discount_coupon.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Discount_coupon } from './discount_coupon.model';

@Module({
  imports: [SequelizeModule.forFeature([Discount_coupon])],
  controllers: [DiscountCouponController],
  providers: [DiscountCouponService],
})
export class DiscountCouponModule {}
