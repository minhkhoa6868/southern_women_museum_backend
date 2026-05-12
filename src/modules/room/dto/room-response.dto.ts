import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { RoomEntity } from '../entity/room.entity';
import { SupportedLanguage } from 'src/core/dto/language-request.dto';

export class RoomResponseDto {
  constructor(room: RoomEntity, language: SupportedLanguage = 'vi') {
    this.id = room.id;
    this.name = language === 'en' ? room.nameEn : room.name;
    this.code = room.code;
    this.description =
      language === 'en'
        ? (room.descriptionEn ?? room.description ?? undefined)
        : (room.description ?? undefined);
    this.createdAt = room.createdAt;
    this.updatedAt = room.updatedAt ?? undefined;
  }

  @ApiProperty({
    description: 'Room ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;

  @ApiProperty({
    description: 'Room name in Vietnamese',
    example: 'Phòng Tranh Dân Gian',
  })
  name: string;

  @ApiProperty({
    description: 'Unique room code',
    example: 'FOLK-PAINT',
  })
  code: string;

  @ApiPropertyOptional({
    description: 'Optional room description',
    example:
      'Trưng bày những bức tranh dân gian tiêu biểu của miền Nam Việt Nam.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'Optional room description in English',
    example: 'Showcases iconic Southern Vietnamese folk paintings.',
  })
  descriptionEn?: string;

  @ApiProperty({
    description: 'Created timestamp',
    example: '2026-04-26T09:15:00.000Z',
  })
  createdAt: Date;

  @ApiPropertyOptional({
    description: 'Last updated timestamp',
    example: '2026-04-26T10:40:00.000Z',
  })
  updatedAt?: Date;
}
