import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from './customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel(Customer) private customerRepo: typeof Customer) {}
  async create(createCustomerDto: CreateCustomerDto) {
    const phoneCandidate = await this.customerRepo.findOne({
      where: { phone: createCustomerDto.phone },
    });
    if (phoneCandidate) {
      throw new BadRequestException('this phone already axists in database');
    }
    const emailCandidate = await this.customerRepo.findOne({
      where: { email: createCustomerDto.email },
    });
    if (emailCandidate) {
      throw new BadRequestException('this email already axists in database');
    }
    const newCustomer = await this.customerRepo.create(createCustomerDto);
    return newCustomer;
  }

  async findAll() {
    const customers = await this.customerRepo.findAll();
    if (!customers) {
      throw new BadRequestException('Customers not found');
    }
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({ where: { id: id } });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    return customer;
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const Customer = await this.customerRepo.findOne({ where: { id: id } });
    if (!Customer) {
      throw new BadRequestException('Customer not found');
    }
    if (updateCustomerDto.phone) {
      const phoneCandidate = await this.customerRepo.findOne({
        where: { phone: updateCustomerDto.phone },
      });
      if (phoneCandidate && phoneCandidate.id != id) {
        throw new BadRequestException('This ticket already exists');
      }
    }
    if (updateCustomerDto.email) {
      const emailCandidate = await this.customerRepo.findOne({
        where: { email: updateCustomerDto.email },
      });
      if (emailCandidate && emailCandidate.id != id) {
        throw new BadRequestException('This email already exists');
      }
    }
    const updatedCustomer = await (
      await this.customerRepo.update(updateCustomerDto, {
        where: { id: id },
        returning: true,
      })
    )[1][0];
    return updatedCustomer;
  }

  async remove(id: number) {
    const Customer = await this.customerRepo.findOne({ where: { id: id } });
    if (!Customer) {
      throw new BadRequestException('Customer not found');
    }
    return { message: 'Customer deleted', Customer };
  }
}
