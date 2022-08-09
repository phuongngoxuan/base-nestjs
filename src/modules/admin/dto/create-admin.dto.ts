import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class CreateAdminDto {
  @ApiProperty({
    required: true,
    example: '',
    description: 'tài khoản ví của người dùng ',
  })
  @IsNotEmpty()
  @IsString()
  readonly walletAddress: string;
}
