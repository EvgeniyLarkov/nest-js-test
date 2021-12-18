import { IsObject, IsString } from 'class-validator';

export interface LngLat {
  lng: number;
  lat: number;
}

export class CreateMarkerDto {
  @IsString()
  readonly text: string;

  @IsString()
  readonly name: string;

  @IsObject()
  readonly lnglat: LngLat;
}
