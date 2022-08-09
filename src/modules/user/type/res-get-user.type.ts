import { UserInfoEntity } from '../../../models/entities/user-info.entity';
import { ApiProperty } from '@nestjs/swagger';
export class ResGetUserType {
  @ApiProperty({ type: UserInfoEntity, isArray: true })
  data: UserInfoEntity[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  lastPage: number;
}
