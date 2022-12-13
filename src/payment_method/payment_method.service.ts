import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { Payment_method } from './payment_method.model';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(Payment_method)
    private paymentMethodRepo: typeof Payment_method,
  ) {}
  async create(createpayment_methodDto: CreatePaymentMethodDto) {
    const candidate = await this.paymentMethodRepo.findOne({
      where: { name: createpayment_methodDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newpayment_method = await this.paymentMethodRepo.create(
      createpayment_methodDto,
    );
    return newpayment_method;
  }

  async findAll() {
    const payment_methods = await this.paymentMethodRepo.findAll();
    if (!payment_methods) {
      throw new BadRequestException('payment_methods not found');
    }
    return payment_methods;
  }

  async findOne(id: number) {
    const payment_method = await this.paymentMethodRepo.findOne({
      where: { id: id },
    });
    if (!payment_method) {
      throw new BadRequestException('payment_method not found');
    }
    return payment_method;
  }

  async update(id: number, updatepayment_methodDto: UpdatePaymentMethodDto) {
    const payment_method = await this.paymentMethodRepo.findOne({
      where: { id: id },
    });
    if (!payment_method) {
      throw new BadRequestException('payment_method not found');
    }
    if (updatepayment_methodDto.name) {
      const candidate = await this.paymentMethodRepo.findOne({
        where: { name: updatepayment_methodDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updatedpayment_method = await (
      await this.paymentMethodRepo.update(updatepayment_methodDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedpayment_method;
  }

  async remove(id: number) {
    const payment_method = await this.paymentMethodRepo.findOne({
      where: { id: id },
    });
    if (!payment_method) {
      throw new BadRequestException('payment_method not found');
    }
    await this.paymentMethodRepo.destroy({ where: { id: id } });
    return { message: 'payment_method deleted', payment_method };
  }
}
