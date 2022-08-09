import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_histories')
export class UserHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pool_id' })
  poolId: number;

  @Column({ name: 'user_address' })
  userAddress: string;

  @Column({ name: 'symbol' })
  symbol: string;

  @Column({ name: 'chain_id' })
  chainId: string;

  @Column({ name: 'block_timestamp' })
  blockTimestamp: number;

  @Column({ name: 'pool_address' })
  poolAddress: string;

  @Column({ name: 'last_block' })
  lastBlock: string;

  @Column({ name: 'tx_hash' })
  txHash: string;

  @Column({ name: 'log_index' })
  logIndex: string;

  @Column({ name: 'data', type: 'json' })
  data: string;

  @Column()
  url: string;

  @Column()
  action: string;

  @Column()
  amount: string;

  @Column({ name: 'start_stake' })
  startStake: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
