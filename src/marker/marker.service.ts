import {
  Injectable,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Event } from 'src/event/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { CreateMarkerDto, LngLat } from './dto/create-marker.dto';
import { UpdateMarkerDto } from './dto/update-marker.dto';
import { Lnglat } from './entities/lnglat.entity';
import { Marker } from './entities/marker.entity';

@Injectable()
export class MarkerService {
  constructor(
    @InjectRepository(Marker)
    private readonly MarkerRepository: Repository<Marker>,
    @InjectRepository(Lnglat)
    private readonly LnglatRepository: Repository<Lnglat>,
    private readonly connection: Connection,
  ) {}

  async create(createMarkerDto: CreateMarkerDto) {
    const lnglat = await this.addLngLat(createMarkerDto.lnglat);

    const marker = this.MarkerRepository.create({
      ...createMarkerDto,
      lnglat,
    });

    return this.MarkerRepository.save(marker);
  }

  findAll(@Query() query: PaginationQueryDto) {
    const { limit, offset } = query;

    return this.MarkerRepository.find({
      relations: ['lnglat'],
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: number) {
    return this.MarkerRepository.findOne(id, { relations: ['lnglat'] });
  }

  update(id: number, updateMarkerDto: UpdateMarkerDto) {
    return `This action updates a #${id} marker`;
  }

  remove(id: number) {
    return `This action removes a #${id} marker`;
  }

  async setViewed(marker: Marker) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      marker.count += 1;

      const viewedEvent = new Event();
      viewedEvent.name = 'Viewed event';
      viewedEvent.type = 'view';
      viewedEvent.payload = { markerId: marker.id };

      await queryRunner.manager.save(marker);
      await queryRunner.manager.save(viewedEvent);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      await queryRunner.release();
    }

    return this.findOne(marker.id);
  }

  private async addLngLat(lnglat: LngLat) {
    const data = this.LnglatRepository.create(lnglat);

    return this.LnglatRepository.save(data);
  }
}
