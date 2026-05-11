// src/modules/events/dto/create-event.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsUrl, IsEnum } from 'class-validator';
import { EventStatus } from '../entity/event.entity';

export class CreateEventDto {
  @ApiProperty({
    description: 'Event title',
    example: 'Summer Exhibition 2024',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({
    description: 'Event description',
    example: 'Join us for an amazing summer exhibition featuring local artists',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description!: string;

  @ApiProperty({
    description: 'Event date',
    example: '2024-06-15',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  date!: string;

  @ApiProperty({
    description: 'Event image URL',
    example: 'https://example.com/images/event.jpg',
    required: false,
  })
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({
    description: 'Event status',
    example: EventStatus.ACTIVE,
    enum: EventStatus,
    default: EventStatus.ACTIVE,
    required: false,
  })
  @IsEnum(EventStatus)
  @IsOptional()
  status?: EventStatus;
}