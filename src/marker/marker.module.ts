import { Module } from '@nestjs/common';
import { MarkerService } from './marker.service';
import { MarkerController } from './marker.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Marker } from './entities/marker.entity';
import { Lnglat } from './entities/lnglat.entity';
import { Event } from 'src/event/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Marker, Lnglat, Event])],
  controllers: [MarkerController],
  providers: [MarkerService],
})
export class MarkerModule {}
