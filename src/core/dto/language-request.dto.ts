import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export const SUPPORTED_LANGUAGES = ['vi', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export class LanguageRequestDto {
  @ApiPropertyOptional({
    description: 'Requested response language',
    example: 'vi',
    enum: SUPPORTED_LANGUAGES,
    default: 'vi',
  })
  @IsOptional()
  @IsIn(SUPPORTED_LANGUAGES)
  language?: SupportedLanguage;
}
