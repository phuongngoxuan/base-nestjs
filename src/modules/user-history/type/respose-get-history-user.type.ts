import { UserHistoryEntity } from '../../../models/entities/user-history.entity';
import { ApiProperty } from '@nestjs/swagger';
export class ResGetUserHistory {
  @ApiProperty()
  data: UserHistoryEntity[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  lastPage: number;
}
