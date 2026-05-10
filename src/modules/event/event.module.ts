import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './event.service';
import { EventsController } from './event.controller';
import { Event } from './entity/event.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Event]), AuthModule],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}