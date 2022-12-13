import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Discount_coupon } from './discount_coupon.model';
import { CreateDiscountCouponDto } from './dto/create-discount_coupon.dto';
import { UpdateDiscountCouponDto } from './dto/update-discount_coupon.dto';

@Injectable()
export class DiscountCouponService {
  constructor(
    @InjectModel(Discount_coupon)
    private discountCouponRepo: typeof Discount_coupon,
  ) {}
  async create(creatediscount_couponDto: CreateDiscountCouponDto) {
    const candidate = await this.discountCouponRepo.findOne({
      where: { name: creatediscount_couponDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newdiscount_coupon = await this.discountCouponRepo.create(
      creatediscount_couponDto,
    );
    return newdiscount_coupon;
  }

  async findAll() {
    const discount_coupons = await this.discountCouponRepo.findAll();
    if (!discount_coupons) {
      throw new BadRequestException('discount_coupons not found');
    }
    return discount_coupons;
  }

  async findOne(id: number) {
    const discount_coupon = await this.discountCouponRepo.findOne({
      where: { id: id },
    });
    if (!discount_coupon) {
      throw new BadRequestException('discount_coupon not found');
    }
    return discount_coupon;
  }

  async update(id: number, updatediscount_couponDto: UpdateDiscountCouponDto) {
    const discount_coupon = await this.discountCouponRepo.findOne({
      where: { id: id },
    });
    if (!discount_coupon) {
      throw new BadRequestException('discount_coupon not found');
    }
    if (updatediscount_couponDto.name) {
      const candidate = await this.discountCouponRepo.findOne({
        where: { name: updatediscount_couponDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updateddiscount_coupon = await (
      await this.discountCouponRepo.update(updatediscount_couponDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updateddiscount_coupon;
  }

  async remove(id: number) {
    const discount_coupon = await this.discountCouponRepo.findOne({
      where: { id: id },
    });
    if (!discount_coupon) {
      throw new BadRequestException('discount_coupon not found');
    }
    await this.discountCouponRepo.destroy({ where: { id: id } });
    return { message: 'discount_coupon deleted', discount_coupon };
  }
}
