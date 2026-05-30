import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsUUID, Min } from 'class-validator';
import { LanguageRequestDto } from 'src/core/dto/language-request.dto';

export class ArtifactDetailRequestDto extends LanguageRequestDto {
  @ApiProperty({
    description: 'The room ID to which the artifact belongs',
    example: '550e8400-e29b-41d4-a716-446655440111',
  })
  @IsUUID()
  roomId!: string;

  @ApiProperty({
    description: 'The order number of the artifact within the room',
    example: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  orderNo!: number;
}
