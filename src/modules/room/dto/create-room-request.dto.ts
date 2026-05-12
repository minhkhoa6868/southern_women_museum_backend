import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { LanguageRequestDto } from 'src/core/dto/language-request.dto';

export class CreateRoomRequestDto extends LanguageRequestDto {
  @ApiProperty({
    description: 'Room name in Vietnamese',
    example: 'Phòng Tranh Dân Gian',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name!: string;

  @ApiProperty({
    description: 'Room name in English',
    example: 'Folk Painting Room',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  nameEn!: string;

  @ApiProperty({
    description: 'Unique room code',
    example: 'FOLK-PAINT',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;

  @ApiPropertyOptional({
    description: 'Optional room description in Vietnamese',
    example:
      'Trưng bày những bức tranh dân gian tiêu biểu của miền Nam Việt Nam.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @ApiPropertyOptional({
    description: 'Optional room description in English',
    example: 'Showcases iconic Southern Vietnamese folk paintings.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(1000)
  descriptionEn?: string;
}
