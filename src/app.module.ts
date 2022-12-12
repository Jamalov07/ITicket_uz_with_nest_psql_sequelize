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

@Module({
  imports: [BookingModule, CartModule, CustomerCardModule, CustomerModule, TicketModule, CustomerAddressModule, EventModule, SeatModule, SeatTypeModule, EventTypeModule, HumanCategoryModule, VenueModule, VenuePhotoModule, VenueTypeModule, AdminModule],
})
export class AppModule {}
