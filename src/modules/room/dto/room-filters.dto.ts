import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RoomFiltersDto {
  @ApiPropertyOptional({
    description: 'Filter by room name (partial match)',
    example: 'Tranh',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by room English name (partial match)',
    example: 'Painting',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  nameEn?: string;

  @ApiPropertyOptional({
    description: 'Filter by room code (partial match)',
    example: 'FOLK',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  code?: string;
}
