import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RoomDetailRequestDto {
  @ApiProperty({
    description: 'The unique code of the room',
    example: 'room-12345',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  code!: string;
}
