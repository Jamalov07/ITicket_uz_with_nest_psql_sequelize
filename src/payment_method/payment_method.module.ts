import { Module } from '@nestjs/common';
import { PaymentMethodService } from './payment_method.service';
import { PaymentMethodController } from './payment_method.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment_method } from './payment_method.model';

@Module({
  imports: [SequelizeModule.forFeature([Payment_method])],
  controllers: [PaymentMethodController],
  providers: [PaymentMethodService],
})
export class PaymentMethodModule {}
