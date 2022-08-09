import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsOptional,
  IsPositive,
  IsIn,
  Max,
  IsString,
} from 'class-validator';

export class QueryPoolsDto {
  @ApiPropertyOptional({
    description: 'ID của pool muốn search',
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  @IsOptional()
  poolId?: number;

  @ApiProperty({
    example: 'DESC',
    description:
      'có thể sort theo 2 kiểu DESC và ASC dựa vào ngày được thêm vào trong db',
  })
  @Transform(({ value }) => String(value))
  @IsIn(['DESC', 'ASC', 'desc', 'asc'])
  @IsOptional()
  sort?: string;

  @ApiPropertyOptional({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @IsPositive()
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    example: 20,
    description:
      'có thể lấy max là 100 giá trị trên một trang số limit mặc định là 20',
  })
  @Transform(({ value }) => Number(value))
  @IsInt()
  @Max(100)
  @IsPositive()
  @IsOptional()
  limit?: number = 20;

  @ApiPropertyOptional({ example: '' })
  @IsString()
  @IsOptional()
  symbol?: string;

  @ApiPropertyOptional({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  openTime?: number;

  @ApiPropertyOptional({ example: 1655422651 })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  closeTime?: number;

  @ApiPropertyOptional({ example: 1 })
  @Transform(({ value }) => Number(value))
  @IsInt()
  // @IsPositive()
  @IsOptional()
  poolType?: number;

  @ApiPropertyOptional({
    example: 1,
    description:
      'có nhưng loại status sau: inactive:0 , active:1, end:2, endAndActive:4,  5  live finished',
  })
  // @IsIn(['0', '1', '2', '3', 'live', 'finished'])
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({
    example: '',
  })
  @IsOptional()
  account?: string;
}
