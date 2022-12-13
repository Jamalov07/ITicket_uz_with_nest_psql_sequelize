import { Module } from '@nestjs/common';
import { EventTypeService } from './event_type.service';
import { EventTypeController } from './event_type.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event_type } from './event_type.model';

@Module({
  imports: [SequelizeModule.forFeature([Event_type])],
  controllers: [EventTypeController],
  providers: [EventTypeService],
})
export class EventTypeModule {}
