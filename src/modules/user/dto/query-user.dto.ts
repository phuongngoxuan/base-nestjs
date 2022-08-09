import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsPositive, IsOptional, Max, IsIn } from 'class-validator';

export class QueryUserInfoDto {
  @ApiPropertyOptional({
    example: '',
    description: 'tài khoản ví của người dùng',
  })
  @Transform(({ value }) => String(value))
  @IsOptional()
  account?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'NORANK: 0, BRONZE: 1, SILVER: 2, GOLD: 3 ',
  })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsIn([0, 1, 2, 3])
  @IsOptional()
  tier?: number;

  @ApiProperty({
    example: 'DESC',
    description:
      'có thể sort theo 2 kiểu DESC và ASC dựa vào ngày được thêm vào trong db',
  })
  @Transform(({ value }) => String(value))
  @IsOptional()
  @IsIn(['DESC', 'ASC', 'desc', 'asc'])
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

  @ApiPropertyOptional({
    example: true,
    description: 'all để lấy tất cả người dùng ',
  })
  @IsOptional()
  all?: boolean;
}
