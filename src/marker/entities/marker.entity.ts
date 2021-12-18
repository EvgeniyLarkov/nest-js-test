import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lnglat } from './lnglat.entity';

@Entity()
export class Marker {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @Column()
  name: string;

  @Column({ default: 0 })
  count: number;

  @JoinColumn()
  @OneToOne(() => Lnglat, { cascade: true })
  lnglat: Lnglat;
}
