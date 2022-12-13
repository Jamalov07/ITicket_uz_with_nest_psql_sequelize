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
import { Booking } from './booking/booking.model';
import { Cart } from './cart/cart.model';
import { Customer } from './customer/customer.model';
import { Customer_address } from './customer_address/customer_address.model';
import { Customer_card } from './customer_card/customer_card.model';
import { Delivery_method } from './delivery_method/delivery_method.model';
import { Discount_coupon } from './discount_coupon/discount_coupon.model';
import { District } from './district/district.model';
import { Event } from './event/event.model';
import { Event_type } from './event_type/event_type.model';
import { Gender } from './gender/gender.model';
import { Human_Category } from './human_category/human_category.model';
import { Language } from './language/language.model';
import { Payment_method } from './payment_method/payment_method.model';
import { Region } from './region/region.model';
import { Seat } from './seat/seat.model';
import { Seat_Type } from './seat_type/seat_type.model';
import { Status } from './status/status.model';
import { Ticket } from './ticket/ticket.model';
import { Ticket_type } from './ticket_type/ticket_type.model';
import { Venue } from './venue/venue.model';
import { Venue_type } from './venue_type/venue_type.model';
import { Venue_photo } from './venue_photo/venue_photo.model';

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
      models: [
        Admin,
        Booking,
        Cart,
        Country,
        Customer,
        Customer_address,
        Customer_card,
        Delivery_method,
        Discount_coupon,
        District,
        Event,
        Event_type,
        Gender,
        Human_Category,
        Language,
        Payment_method,
        Region,
        Seat,
        Seat_Type,
        Status,
        Ticket,
        Ticket_type,
        Venue,
        Venue_type,
        Venue_photo,
      ],
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
