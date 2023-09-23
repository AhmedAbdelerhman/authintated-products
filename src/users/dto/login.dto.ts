import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsDate, IsNotEmpty, IsNumber } from 'class-validator';

export class LogInDto {

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' }) // Add an example value for the email field

  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123' }) // Add an example value for the password field

  password: string;

  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional({ example: 100 })

  tokenSecondsDuration: Number ;

}
