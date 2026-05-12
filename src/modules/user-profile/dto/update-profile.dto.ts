import { IsString, IsOptional, IsBoolean, IsEmail } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  first_name?: string;

  @IsString()
  @IsOptional()
  last_name?: string;

  @IsString()
  @IsOptional()
  language?: string;

  @IsBoolean()
  @IsOptional()
  is_notification_enabled?: boolean;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
