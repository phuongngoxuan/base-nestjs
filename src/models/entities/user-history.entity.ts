import { UserInfoEntity } from './user-info.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user_histories')
export class UserHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_address' })
  userAddress: string;

  @Column({ name: 'from' })
  from: string;

  @Column({ name: 'to' })
  to: string;

  @Column({ name: 'tx_hash' })
  txHash: string;

  @Column({ name: 'block_number' })
  blockNumber: number;

  @Column({ name: 'log_index' })
  logIndex: number;

  @Column({ name: 'action' })
  action: string;

  @Column({ name: 'amount' })
  amount: string;

  @Column({ name: 'symbol' })
  symbol: string;

  @Column({ name: 'decimal' })
  decimal: number;

  @Column({ name: 'block_timestamp' })
  blockTimestamp: number;

  @Column({ name: 'pool_id' })
  poolId: string;

  @Column({ name: 'pool_address' })
  poolAddress: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'start_stake' })
  startStake: string;

  @Column({ name: 'chain_id' })
  chainId: number;

  @Column({ name: 'data', type: 'json' })
  data: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne((type) => UserInfoEntity, (user) => user.history)
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UserInfoEntity;
}
