import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class UpdateArtifactPositionRequestDto {
  @ApiPropertyOptional({
    description: 'Normalized X coordinate inside room map frame (0.0 - 1.0)',
    example: 0.42,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  positionX?: number;

  @ApiPropertyOptional({
    description: 'Normalized Y coordinate inside room map frame (0.0 - 1.0)',
    example: 0.28,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(1)
  positionY?: number;
}
