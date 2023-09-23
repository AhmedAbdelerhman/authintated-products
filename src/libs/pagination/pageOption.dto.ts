import { Transform, Type } from 'class-transformer';
import {
  Allow,
  IsEnum,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PageOptionsDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @ApiProperty({ example: 10 })

  readonly limit?: number = 10;

  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @IsOptional()
  @ApiProperty({ example: 1 })

  readonly page?: number = 1;

}
