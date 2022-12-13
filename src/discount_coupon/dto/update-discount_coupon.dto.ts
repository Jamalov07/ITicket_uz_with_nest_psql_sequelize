// import { PartialType } from '@nestjs/mapped-types';
// import { CreateDiscountCouponDto } from './create-discount_coupon.dto';

// export class UpdateDiscountCouponDto extends PartialType(CreateDiscountCouponDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateDiscountCouponDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
