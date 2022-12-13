import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer_card } from './customer_card.model';
import { CreateCustomerCardDto } from './dto/create-customer_card.dto';
import { UpdateCustomerCardDto } from './dto/update-customer_card.dto';

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(Customer_card)
    private customerCardRepo: typeof Customer_card,
  ) {}

  async create(createCustomer_cardDto: CreateCustomerCardDto) {
    const candidate = await this.customerCardRepo.findOne({
      where: { ...createCustomer_cardDto },
    });
    if (candidate) {
      throw new BadRequestException('this datas already axists in database');
    }
    const newCustomer_card = await this.customerCardRepo.create(
      createCustomer_cardDto,
    );
    return newCustomer_card;
  }

  async findAll() {
    const customer_cards = await this.customerCardRepo.findAll();
    if (!customer_cards) {
      throw new BadRequestException('Customer_cards not found');
    }
    return customer_cards;
  }

  async findOne(id: number) {
    const customer_card = await this.customerCardRepo.findOne({
      where: { id: id },
    });
    if (!customer_card) {
      throw new BadRequestException('Customer_card not found');
    }
    return customer_card;
  }

  async update(id: number, updateCustomer_cardDto: UpdateCustomerCardDto) {
    const customer_card = await this.customerCardRepo.findOne({
      where: { id: id },
    });
    if (!customer_card) {
      throw new BadRequestException('Customer_card not found');
    }

    const candidate = await this.customerCardRepo.findOne({
      where: { ...updateCustomer_cardDto },
    });
    if (candidate && candidate.id != id) {
      throw new BadRequestException('This data already exists');
    }

    const updatedCustomer_card = await (
      await this.customerCardRepo.update(updateCustomer_cardDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedCustomer_card;
  }

  async remove(id: number) {
    const customer_card = await this.customerCardRepo.findOne({
      where: { id: id },
    });
    if (!customer_card) {
      throw new BadRequestException('Customer_card not found');
    }
    await this.customerCardRepo.destroy({ where: { id: id } });

    return { message: 'Customer_card deleted', customer_card };
  }
}
