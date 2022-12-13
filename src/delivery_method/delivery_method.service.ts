import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Delivery_method } from './delivery_method.model';
import { CreateDeliveryMethodDto } from './dto/create-delivery_method.dto';
import { UpdateDeliveryMethodDto } from './dto/update-delivery_method.dto';

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(Delivery_method)
    private deliveryMethodRepo: typeof Delivery_method,
  ) {}
  async create(createdelivery_methodDto: CreateDeliveryMethodDto) {
    const candidate = await this.deliveryMethodRepo.findOne({
      where: { name: createdelivery_methodDto.name },
    });
    if (candidate) {
      throw new BadRequestException('this name already axists in database');
    }
    const newdelivery_method = await this.deliveryMethodRepo.create(
      createdelivery_methodDto,
    );
    return newdelivery_method;
  }

  async findAll() {
    const delivery_methods = await this.deliveryMethodRepo.findAll();
    if (!delivery_methods) {
      throw new BadRequestException('delivery_methods not found');
    }
    return delivery_methods;
  }

  async findOne(id: number) {
    const delivery_method = await this.deliveryMethodRepo.findOne({
      where: { id: id },
    });
    if (!delivery_method) {
      throw new BadRequestException('delivery_method not found');
    }
    return delivery_method;
  }

  async update(id: number, updatedelivery_methodDto: UpdateDeliveryMethodDto) {
    const delivery_method = await this.deliveryMethodRepo.findOne({
      where: { id: id },
    });
    if (!delivery_method) {
      throw new BadRequestException('delivery_method not found');
    }
    if (updatedelivery_methodDto.name) {
      const candidate = await this.deliveryMethodRepo.findOne({
        where: { name: updatedelivery_methodDto.name },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This name already exists');
      }
    }
    const updateddelivery_method = await (
      await this.deliveryMethodRepo.update(updatedelivery_methodDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updateddelivery_method;
  }

  async remove(id: number) {
    const delivery_method = await this.deliveryMethodRepo.findOne({
      where: { id: id },
    });
    if (!delivery_method) {
      throw new BadRequestException('delivery_method not found');
    }
    await this.deliveryMethodRepo.destroy({ where: { id: id } });
    return { message: 'delivery_method deleted', delivery_method };
  }
}
