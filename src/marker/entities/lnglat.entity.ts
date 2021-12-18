import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Marker } from './marker.entity';

@Entity()
export class Lnglat {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lng: number;

  @Column()
  lat: number;

  @OneToOne(() => Marker, (marker) => marker.lnglat)
  marker: Marker;
}
