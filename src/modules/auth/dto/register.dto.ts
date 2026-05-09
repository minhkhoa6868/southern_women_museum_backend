import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty ({
    description: 'User first name',
    example: 'Michael'
  })
  @IsString()
  @IsNotEmpty()
  first_name!: string;

  @ApiProperty ({
    description: 'User last name',
    example: 'Jackson'
  })
  @IsString()
  @IsNotEmpty()
  last_name!: string;

  @ApiProperty ({
    description: 'User email address',
    example: 'user2@example.com'
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty ({
    description: 'User phone number',
    example: '1234567890'
  })
  @IsString()
  @IsNotEmpty()
  phone!: string;

  @ApiProperty ({
    description: 'User password',
    example: 'password123'
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}