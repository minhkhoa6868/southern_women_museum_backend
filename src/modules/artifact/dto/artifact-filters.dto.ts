import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class ArtifactFiltersDto {
  @ApiPropertyOptional({
    description: 'Filter by room ID',
    example: '550e8400-e29b-41d4-a716-446655440111',
  })
  @IsOptional()
  @IsUUID()
  roomId?: string;

  @ApiPropertyOptional({
    description: 'Filter by artifact name (partial match)',
    example: 'Trống',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @ApiPropertyOptional({
    description: 'Filter by artifact code (partial match)',
    example: 'ART',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  code?: string;
}
