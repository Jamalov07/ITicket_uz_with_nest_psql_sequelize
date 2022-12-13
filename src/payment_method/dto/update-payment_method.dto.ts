// import { PartialType } from '@nestjs/mapped-types';
// import { CreatePaymentMethodDto } from './create-payment_method.dto';

// export class UpdatePaymentMethodDto extends PartialType(CreatePaymentMethodDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdatePaymentMethodDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
