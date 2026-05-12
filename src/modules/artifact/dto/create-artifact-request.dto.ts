import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { LanguageRequestDto } from 'src/core/dto/language-request.dto';

export class CreateArtifactRequestDto extends LanguageRequestDto {
  @ApiProperty({
    description: 'Room ID that the artifact belongs to',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  roomId!: string;

  @ApiProperty({
    description: 'Artifact name in Vietnamese',
    example: 'Trống đồng Đông Sơn',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiPropertyOptional({
    description: 'Artifact description in Vietnamese',
    example: 'Hiện vật tiêu biểu của văn hóa Đông Sơn.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @ApiPropertyOptional({
    description: 'Artifact description in English',
    example: 'A representative artifact of Dong Son culture.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  descriptionEn?: string;

  @ApiPropertyOptional({
    description: 'Artifact image URL',
    example: 'https://example.com/artifacts/dong-son-bronze-drum.jpg',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  imgUrl?: string;

  @ApiPropertyOptional({
    description: 'Historical date related to artifact',
    example: '2025-12-12T00:00:00.000Z',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  historyDate?: Date;

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
