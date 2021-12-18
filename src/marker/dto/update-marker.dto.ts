import { CreateMarkerDto } from './create-marker.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateMarkerDto extends PartialType(CreateMarkerDto) {}
