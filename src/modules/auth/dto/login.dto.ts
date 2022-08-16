import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: true,
    example: '0xBf3Ffd23Cff26bdb4d94376907A58F00eEb33023',
  })
  @IsNotEmpty()
  @IsString()
  readonly walletAddress: string;

  @ApiProperty({
    required: true,
    example:
      '0xf62b790ac7db828cd874df31d0fbd2a022c749508ed85ff950bf08916e6ec68530472e8441022b1c4a658f01e4408891e1793464825a430cd4df2a40c37fb9a81c',
  })
  @IsNotEmpty()
  @IsString()
  readonly signature: string;

  @ApiProperty({
    required: true,
    example: 'Red Kite User Signature',
  })
  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
