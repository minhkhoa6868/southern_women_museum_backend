import { ApiProperty } from '@nestjs/swagger';

export class EventResponseDto {
  @ApiProperty({
    description: 'Event unique identifier',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id!: string;

  @ApiProperty({
    description: 'Event title',
    example: 'Summer Exhibition 2024',
  })
  title!: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Join us for an amazing summer exhibition',
  })
  description!: string;

  @ApiProperty({
    description: 'Event date',
    example: '2024-06-15',
  })
  date!: string;

  @ApiProperty({
    description: 'Event image URL',
    example: 'https://example.com/images/event.jpg',
    required: false,
  })
  image_url?: string;

  @ApiProperty({
    description: 'Event status',
    example: 'active',
    enum: ['active', 'inactive', 'ended'],
  })
  status?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  createdAt!: Date;

  @ApiProperty({
    description: 'Last update timestamp',
    example: '2024-01-01T00:00:00.000Z',
  })
  updatedAt?: Date;
}