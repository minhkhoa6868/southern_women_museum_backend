import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';
import { CreateArtifactRequestDto } from './create-artifact-request.dto';

export class UpdateArtifactRequestDto extends PartialType(
  CreateArtifactRequestDto,
) {
  @ApiPropertyOptional({
    description: 'Display order number in room',
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  orderNo?: number;
}
