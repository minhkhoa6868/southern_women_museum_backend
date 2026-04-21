import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class NumericIdRequestDto {
  constructor(id: number) {
    this.id = id;
  }

  @ApiProperty({ description: 'Numeric ID', example: 1 })
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  id: number;
}
