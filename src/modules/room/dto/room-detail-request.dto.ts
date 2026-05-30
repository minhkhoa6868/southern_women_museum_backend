import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { LanguageRequestDto } from 'src/core/dto/language-request.dto';

export class RoomDetailRequestDto extends LanguageRequestDto {
  @ApiProperty({
    description: 'The unique code of the room',
    example: 'room-12345',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;
}
