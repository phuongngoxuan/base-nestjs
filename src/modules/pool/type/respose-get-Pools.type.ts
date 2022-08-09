import { PoolInfoEntity } from '../../../models/entities/pool-info.entity';
import { ApiProperty } from '@nestjs/swagger';
export class ResPoolType {
  @ApiProperty({ type: PoolInfoEntity, isArray: true })
  data: PoolInfoEntity[];
  @ApiProperty()
  total: number;
  @ApiProperty()
  page: number;
  @ApiProperty()
  lastPage: number;
}
