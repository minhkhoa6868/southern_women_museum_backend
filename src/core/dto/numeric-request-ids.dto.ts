import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsInt } from 'class-validator';

export class NumericIdsRequestDto {
  constructor(ids: number[]) {
    this.ids = ids;
  }

  @ApiProperty({ description: 'Numeric IDs', example: [1, 2, 3] })
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  @Type(() => Number)
  ids: number[];
}
