import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('pool_infos')
export class PoolInfoEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'open_time' })
  openTime: string;

  @ApiProperty()
  @Column({ name: 'close_time' })
  closeTime: string;

  @ApiProperty()
  @Column({ name: 'last_reward_second' })
  lastRewardSecond: string;

  @ApiProperty()
  @Column({ name: 'acc_reward_per_share' })
  accRewardPerShare: string;

  @ApiProperty()
  @Column({ name: 'total_reward' })
  totalReward: string;

  @ApiProperty()
  @Column({ name: 'price' })
  price: string;

  @ApiProperty()
  @Column({ name: 'decimal' })
  decimal: string;

  @ApiProperty()
  @Column({ name: 'address' })
  address: string;

  @ApiProperty()
  @Column({ name: 'chain_id' })
  chainId: number;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column()
  symbol: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'pool_type' })
  poolType: number;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
