import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer_address } from './customer_address.model';
import { CreateCustomerAddressDto } from './dto/create-customer_address.dto';
import { UpdateCustomerAddressDto } from './dto/update-customer_address.dto';

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(Customer_address)
    private customer_addressRepo: typeof Customer_address,
  ) {}
  async create(createCustomer_addressDto: CreateCustomerAddressDto) {
    const candidate = await this.customer_addressRepo.findOne({
      where: { customer_id: createCustomer_addressDto.customer_id },
    });
    if (candidate) {
      throw new BadRequestException('this customer already axists in database');
    }
    const newCustomer_address = await this.customer_addressRepo.create(
      createCustomer_addressDto,
    );
    return newCustomer_address;
  }

  async findAll() {
    const Customer_addresss = await this.customer_addressRepo.findAll();
    if (!Customer_addresss) {
      throw new BadRequestException('Customer_addresss not found');
    }
    return Customer_addresss;
  }

  async findOne(id: number) {
    const customer_address = await this.customer_addressRepo.findOne({
      where: { id: id },
    });
    if (!customer_address) {
      throw new BadRequestException('Customer_address not found');
    }
    return customer_address;
  }

  async update(
    id: number,
    updateCustomer_addressDto: UpdateCustomerAddressDto,
  ) {
    const customer_address = await this.customer_addressRepo.findOne({
      where: { id: id },
    });
    if (!customer_address) {
      throw new BadRequestException('Customer_address not found');
    }
    if (updateCustomer_addressDto.customer_id) {
      const candidate = await this.customer_addressRepo.findOne({
        where: { customer_id: updateCustomer_addressDto.customer_id },
      });
      if (candidate && candidate.id != id) {
        throw new BadRequestException('This ticket already exists');
      }
    }
    const updatedCustomer_address = await (
      await this.customer_addressRepo.update(updateCustomer_addressDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedCustomer_address;
  }

  async remove(id: number) {
    const customer_address = await this.customer_addressRepo.findOne({
      where: { id: id },
    });
    if (!customer_address) {
      throw new BadRequestException('Customer_address not found');
    }
    return { message: 'Customer_address deleted', customer_address };
  }
}
