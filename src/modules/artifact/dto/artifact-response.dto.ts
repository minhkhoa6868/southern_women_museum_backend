import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArtifactEntity } from '../entity/artifact.entity';

export class ArtifactResponseDto {
  constructor(artifact: ArtifactEntity) {
    this.id = artifact.id;
    this.roomId = artifact.roomId;
    this.name = artifact.name;
    this.description = artifact.description ?? undefined;
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

  @ApiProperty({
    description: 'Room ID that artifact belongs to',
    example: '550e8400-e29b-41d4-a716-446655440111',
  })
  roomId: string;

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
    description: 'X-axis position on map/layout',
    example: 105.83416,
  })
  positionX?: number;

  @ApiPropertyOptional({
    description: 'Y-axis position on map/layout',
    example: 21.027764,
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
