import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'ahmed123' })

  username?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Ahmed' })

  firstName?: string;

  @IsString()
  @IsOptional()

  @ApiPropertyOptional({ example: 'Abdelrahman' })

  lastName?: string;

  @IsEmail()
  @ApiProperty({ example: 'user@example.com' }) // Add an example value for the email field

  email: string;

  @IsString()
  @ApiProperty({ example: 'password123' }) // Add an example value for the password field
  password: string;


  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'cairo egypt' })

  address?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'Naser city' })

  city?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: 'egypt' })

  country?: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional({ example: '12345' })

  postalCode?: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 100 })
  @Min(30, { message: 'tokenSecondsDuration must be at least 30' })
  @Max(86400, { message: 'tokenSecondsDuration max 86400' })


  tokenSecondsDuration: Number;
}
