import { Module } from '@nestjs/common';
import { CustomerAddressService } from './customer_address.service';
import { CustomerAddressController } from './customer_address.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Customer_address } from './customer_address.model';

@Module({
  imports: [SequelizeModule.forFeature([Customer_address])],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
