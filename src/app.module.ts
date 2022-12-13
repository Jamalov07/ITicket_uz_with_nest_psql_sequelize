import { Module } from '@nestjs/common';
import { BookingModule } from './booking/booking.module';
import { CartModule } from './cart/cart.module';
import { CustomerCardModule } from './customer_card/customer_card.module';
import { CustomerModule } from './customer/customer.module';
import { TicketModule } from './ticket/ticket.module';
import { CustomerAddressModule } from './customer_address/customer_address.module';
import { EventModule } from './event/event.module';
import { SeatModule } from './seat/seat.module';
import { SeatTypeModule } from './seat_type/seat_type.module';
import { EventTypeModule } from './event_type/event_type.module';
import { HumanCategoryModule } from './human_category/human_category.module';
import { VenueModule } from './venue/venue.module';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';
import { VenueTypeModule } from './venue_type/venue_type.module';
import { AdminModule } from './admin/admin.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Admin } from './admin/admin.model';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DeliveryMethodModule } from './delivery_method/delivery_method.module';
import { DiscountCouponModule } from './discount_coupon/discount_coupon.module';
import { StatusModule } from './status/status.module';
import { TicketTypeModule } from './ticket_type/ticket_type.module';
import { LanguageModule } from './language/language.module';
import { CountryModule } from './country/country.module';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { GenderModule } from './gender/gender.module';
import { Country } from './country/country.model';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: `.${process.env.NODE_ENV}.env` }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Admin],
      autoLoadModels: true,
      logging: false,
    }),
    AdminModule,
    BookingModule,
    CartModule,
    CustomerCardModule,
    CustomerModule,
    TicketModule,
    CustomerAddressModule,
    EventModule,
    SeatModule,
    SeatTypeModule,
    EventTypeModule,
    HumanCategoryModule,
    VenueModule,
    VenuePhotoModule,
    VenueTypeModule,
    CountryModule,
    PaymentMethodModule,
    DeliveryMethodModule,
    DiscountCouponModule,
    StatusModule,
    TicketTypeModule,
    LanguageModule,
    RegionModule,
    DistrictModule,
    GenderModule,
  ],
})
export class AppModule {}
