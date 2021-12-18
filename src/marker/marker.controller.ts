import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MarkerService } from './marker.service';
import { CreateMarkerDto } from './dto/create-marker.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Public } from 'src/common/decorators/public.decorator';
import { DenyPublicGuard } from 'src/common/guards/deny-public.guard';

@Controller('marker')
export class MarkerController {
  constructor(private readonly markerService: MarkerService) {}

  @Public()
  @UseGuards(DenyPublicGuard)
  @Patch('/denypublic')
  denyPublic() {
    return 'not denied';
  }

  @Post()
  create(@Body() createMarkerDto: CreateMarkerDto) {
    return this.markerService.create(createMarkerDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryDto) {
    return this.markerService.findAll(query);
  }

  @Get('test')
  findTest() {
    return 'Test get';
  }

  @Get('gone')
  @HttpCode(HttpStatus.GONE)
  goneTest() {
    return 'Gone';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.markerService.findOne(+id);
  }

  @Patch(':id')
  async setViewed(@Param('id') id: number) {
    const marker = await this.markerService.findOne(id);
    const response = await this.markerService.setViewed(marker);

    return response;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.markerService.remove(+id);
  }
}
