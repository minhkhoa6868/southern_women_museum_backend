import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArtifactEntity } from '../entity/artifact.entity';
import { SupportedLanguage } from 'src/core/dto/language-request.dto';

export class ArtifactResponseDto {
  constructor(artifact: ArtifactEntity, language: SupportedLanguage = 'vi') {
    this.id = artifact.id;
    this.roomId = artifact.roomId;
    this.roomName =
      language === 'en' ? artifact.room?.nameEn : artifact.room?.name;
    this.name = artifact.name;
    this.description =
      language === 'en'
        ? (artifact.descriptionEn ?? artifact.description ?? undefined)
        : (artifact.description ?? undefined);
    this.descriptionEn = artifact.descriptionEn ?? undefined;
    this.orderNo = artifact.orderNo;
    this.imgUrl = artifact.imgUrl ?? undefined;
    this.historyDate = artifact.historyDate ?? undefined;
    this.positionX = artifact.positionX ?? undefined;
    this.positionY = artifact.positionY ?? undefined;
    this.createdAt = artifact.createdAt;
    this.updatedAt = artifact.updatedAt ?? undefined;
  }

  @ApiProperty({
    description: 'Artifact ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiPropertyOptional({
    description: 'Room ID that artifact belongs to',
    example: '550e8400-e29b-41d4-a716-446655440111',
    nullable: true,
  })
  roomId?: string | null;

  @ApiPropertyOptional({
    description: 'Room name that artifact belongs to',
    example: 'Phòng Trống Đồng',
  })
  roomName?: string;

  @ApiProperty({
    description: 'Artifact name in Vietnamese',
    example: 'Trống đồng Đông Sơn',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Artifact description in Vietnamese',
    example: 'Hiện vật tiêu biểu của văn hóa Đông Sơn.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Artifact description in English',
    example: 'A representative artifact of Dong Son culture.',
  })
  descriptionEn?: string;

  @ApiProperty({
    description: 'Display order number in room',
    example: 1,
  })
  orderNo: number;

  @ApiPropertyOptional({
    description: 'Artifact image URL',
    example: 'https://example.com/artifacts/dong-son-bronze-drum.jpg',
  })
  imgUrl?: string;

  @ApiPropertyOptional({
    description: 'Historical date related to artifact',
    example: '2025-12-12T00:00:00.000Z',
  })
  historyDate?: Date;

  @ApiPropertyOptional({
    description: 'Normalized X coordinate inside room map frame (0.0 - 1.0)',
    example: 0.42,
  })
  positionX?: number;

  @ApiPropertyOptional({
    description: 'Normalized Y coordinate inside room map frame (0.0 - 1.0)',
    example: 0.28,
  })
  positionY?: number;

  @ApiProperty({
    description: 'Created timestamp',
    example: '2026-04-27T09:15:00.000Z',
  })
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Last updated timestamp',
    example: '2026-04-27T10:40:00.000Z',
  })
  updatedAt?: Date;
}
