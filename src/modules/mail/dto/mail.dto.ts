import { ApiProperty } from '@nestjs/swagger';

export class MailDto {
  @ApiProperty({
    required: true,
    example: 'nxphuongktvt@gmail.com',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: '0xBf3Ffd23Cff26bdb4d94376907A58F00eEb33023',
  })
  user: string;

  @ApiProperty({
    required: true,
    example: 'hello',
  })
  message: string;
}
