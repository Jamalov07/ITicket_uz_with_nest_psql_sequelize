// import { PartialType } from '@nestjs/mapped-types';
// import { CreateDeliveryMethodDto } from './create-delivery_method.dto';

// export class UpdateDeliveryMethodDto extends PartialType(CreateDeliveryMethodDto) {}

import { IsOptional, IsString } from 'class-validator';

export class UpdateDeliveryMethodDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  description?: string;
}
