import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { JwtPayload, JwtPayloadForCustomer } from '../types/jwtPayload.type';
import { Tokens } from '../types/tokens.type';
import { Customer } from './customer.model';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import * as bcrypt from 'bcryptjs';
import { ResponseToUser } from '../types/resToAdminorCustomer.type';
import { LoginCustomer } from '../types/loginCustomer.type';
import { Response } from 'express';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer) private customerRepo: typeof Customer,
    private readonly jwtService: JwtService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto, res: Response) {
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
    const hashedPassword = await bcrypt.hash(
      createCustomerDto.hashed_password,
      7,
    );
    const newCustomer = await this.customerRepo.create({
      ...createCustomerDto,
      hashed_password: hashedPassword,
    });

    const tokens = await this.getTokens(
      newCustomer.id,
      newCustomer.phone,
      newCustomer.email,
    );

    await this.updateRefreshTokenHash(newCustomer.id, tokens.refresh_token);

    const response: ResponseToUser = {
      message: 'customer created',
      customer: newCustomer,
      tokens: tokens,
    };
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return response;
  }

  async login(authBody: LoginCustomer, res: Response) {
    const { email, password } = authBody;

    const customer = await this.customerRepo.findOne({
      where: { email: email },
    });
    if (!customer) {
      throw new UnauthorizedException('customer unauthorized email');
    }
    const ifTrue = await bcrypt.compare(password, customer.hashed_password);
    if (!ifTrue) {
      throw new UnauthorizedException('customer unauthorized password');
    }
    const tokens = await this.getTokens(
      customer.id,
      customer.phone,
      customer.email,
    );

    await this.updateRefreshTokenHash(customer.id, tokens.refresh_token);

    const response: ResponseToUser = {
      message: 'customer re-entered the site',
      customer: customer,
      tokens: tokens,
    };
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return response;
  }

  async refreshToken(customerId: number, refreshToken: string, res: Response) {
    const customer = await this.customerRepo.findOne({
      where: { id: customerId },
    });
    console.log('hello');
    if (!customer || !customer.hashed_refresh_token) {
      throw new ForbiddenException('yoki customer yoki refreshtokeni yoq');
    }
    const rMatches = await bcrypt.compare(
      refreshToken,
      customer.hashed_refresh_token,
    );
    if (!rMatches) {
      throw new ForbiddenException('Refresh token notogri shekillli');
    }

    const tokens = await this.getTokens(
      customer.id,
      customer.phone,
      customer.email,
    );
    await this.updateRefreshTokenHash(customer.id, tokens.refresh_token);
    const response: ResponseToUser = {
      message: 'sended refresh token ',
      customer: customer,
      tokens: tokens,
    };
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    return response;
  }

  async logout(refreshToken: string, res: Response) {
    const customerData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    const { sub } = customerData;
    if (!customerData) {
      throw new UnauthorizedException('customer unauthorized logout');
    }
    const updatedcustomer = await (
      await this.customerRepo.update(
        {
          hashed_refresh_token: null,
        },
        { where: { id: sub }, returning: true },
      )
    )[1][0];
    res.clearCookie('refresh_token');
    return { message: 'customer has logged out', customer: updatedcustomer };
  }

  async findAll() {
    const customers = await this.customerRepo.findAll({
      include: { all: true },
    });
    if (!customers) {
      throw new BadRequestException('Customers not found');
    }
    return customers;
  }

  async findOne(id: number) {
    const customer = await this.customerRepo.findOne({
      where: { id: id },
      include: { all: true },
    });
    if (!customer) {
      throw new BadRequestException('Customer not found');
    }
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
    res: Response,
  ) {
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
    const tokens = await this.getTokens(
      updatedCustomer.id,
      updatedCustomer.phone,
      updatedCustomer.email,
    );

    await this.updateRefreshTokenHash(updatedCustomer.id, tokens.refresh_token);

    const response: ResponseToUser = {
      message: 'customer updated',
      customer: updatedCustomer,
      tokens: tokens,
    };
    res.cookie('refresh_token', tokens.refresh_token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return response;
  }

  async remove(id: number) {
    const Customer = await this.customerRepo.findOne({ where: { id: id } });
    if (!Customer) {
      throw new BadRequestException('Customer not found');
    }
    await this.customerRepo.destroy({ where: { id: id } });
    return { message: 'Customer deleted', Customer };
  }

  async getTokens(
    customerId: number,
    phone: string,
    email: string,
  ): Promise<Tokens> {
    const jwtPayload: JwtPayloadForCustomer = {
      sub: customerId,
      phone,
      email,
    };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME,
      }),
    ]);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async updateRefreshTokenHash(
    customerId: number,
    refreshToken: string,
  ): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 7);
    await this.customerRepo.update(
      { hashed_refresh_token: hashedRefreshToken },
      { where: { id: customerId } },
    );
  }
}
