import { ApiProperty } from '@nestjs/swagger';
export class Tiers {
  @ApiProperty()
  tier: number;
  @ApiProperty()
  holders: number;
}
export class ResGetTierUserType {
  @ApiProperty()
  holdersTotal: number;
  @ApiProperty({ type: Tiers, isArray: true })
  tiers: Tiers[];
}
