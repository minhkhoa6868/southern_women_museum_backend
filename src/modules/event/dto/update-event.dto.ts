// src/modules/events/dto/update-event.dto.ts
import { PartialType } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({
    description: 'Event title',
    example: 'Updated Exhibition Title',
    required: false,
  })
  title?: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Updated description for the exhibition',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Event date',
    example: '2024-07-20',
    required: false,
  })
  date?: string;

  @ApiProperty({
    description: 'Event image URL',
    example: 'https://example.com/images/updated-event.jpg',
    required: false,
  })
  image_url?: string;

  @ApiProperty({
    description: 'Event status',
    example: 'inactive',
    enum: ['active', 'inactive', 'ended'],
    required: false,
  })
  status?: string;
}