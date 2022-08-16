import { ApiProperty } from '@nestjs/swagger';

export class UploadFileType {
  @ApiProperty()
  location: string;
  @ApiProperty()
  key: string;
}
