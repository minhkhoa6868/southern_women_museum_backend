import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsOptional,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';

const supportedLanguages = ['vi', 'en'] as const;

export class PaginationRequestDto<TFilters = Record<string, any>> {
  @ApiPropertyOptional({
    description: 'Requested response language',
    example: 'vi',
    enum: supportedLanguages,
    default: 'vi',
  })
  @IsOptional()
  @IsIn(supportedLanguages)
  language?: (typeof supportedLanguages)[number];

  @ApiPropertyOptional({
    description: 'Page number (starts at 1)',
    example: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'Items per page',
    example: 10,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'Filters for pagination',
    example: {},
  })
  @IsOptional()
  @ValidateNested()
  filters?: TFilters;
}
