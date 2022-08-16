import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DeleteFileDto {
  @ApiProperty({
    required: true,
    example: '',
    description: 'key image muốn xóa ',
  })
  @IsNotEmpty()
  @IsString()
  key: string;
}
