import { ApiProperty } from '@nestjs/swagger';
import { Event } from '../entity/event.entity';
import { EventStatus } from '../entity/event.entity';

export class EventResponseDto {
  @ApiProperty({
    description: 'Event unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({ description: 'Event title', example: 'Summer Exhibition 2024' })
  title!: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Join us for an amazing summer exhibition',
  })
  description!: string;

  @ApiProperty({ description: 'Event date', example: '2024-06-15' })
  date!: string;

  @ApiProperty({
    description: 'Event image URL',
    example: 'https://example.com/images/event.jpg',
    required: false,
  })
  imageUrl?: string;

  @ApiProperty({
    description: 'Event status',
    example: 'active',
    enum: EventStatus,
  })
  status?: EventStatus;

  @ApiProperty({ description: 'Creation timestamp', example: '2024-01-01T00:00:00.000Z' })
  createdAt!: Date;

  @ApiProperty({ description: 'Last update timestamp', example: '2024-01-01T00:00:00.000Z' })
  updatedAt?: Date;

  constructor(event: Event) {
    this.id = event.id;
    this.title = event.title;
    this.description = event.description;
    this.date = event.date;
    this.imageUrl = event.imageUrl;
    this.status = event.status;
    this.createdAt = event.createdAt!;
    this.updatedAt = event.updatedAt;
  }
}
