import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    required: true,
    example: '0x882D4b497Fb7Bf077109835812688509eC8EFBa7',
  })
  @IsNotEmpty()
  @IsString()
  readonly walletAddress: string;

  @ApiProperty({
    required: true,
    example:
      '0xae4cb17dbadd2cb2fefcba847cc8b8d3c496fa480e809b646ce9b4b8bb2eebe165f87843e7aa33157cf769b22ca0101b394f4077b9f0151b8dcd02ad462c7a381b',
  })
  @IsNotEmpty()
  @IsString()
  readonly signature: string;

  @ApiProperty({
    required: true,
    example: 'base message signature',
  })
  @IsNotEmpty()
  @IsString()
  readonly message: string;
}
