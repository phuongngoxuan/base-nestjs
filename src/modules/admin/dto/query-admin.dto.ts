import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, IsPositive, IsIn, Max } from 'class-validator';

export class QueryAdminDto {
  @ApiPropertyOptional({
    example: '0x882D4b497Fb7Bf077109835812688509eC8EFBa7',
    description: 'tài khoản ví của người dùng',
  })
  @Transform(({ value }) => String(value))
  @IsOptional()
  account?: string;

  @ApiProperty({
    required: true,
    example: 'DESC',
    description: 'có thể sort theo 2 kiểu DESC và ASC',
  })
  @Transform(({ value }) => String(value))
  @IsOptional()
  @IsIn(['DESC', 'ASC'])
  sort?: string;

  @ApiPropertyOptional({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ example: 20 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Max(100)
  @IsPositive()
  @IsOptional()
  limit?: number = 20;
}
