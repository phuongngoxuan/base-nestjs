import { UserInfoPoolInfosEntity } from './user_infos_pool_infos';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('pools_infos')
export class PoolInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'chain_id' })
  chainId: number;

  @Column({ name: 'total_stake', type: 'decimal', precision: 40, scale: 0 })
  totalStake: string;

  @Column({ name: 'total_un_stake', type: 'decimal', precision: 40, scale: 0 })
  totalUnStake: string;

  @Column({ name: 'total_claim', type: 'decimal', precision: 40, scale: 0 })
  totalClaim: string;

  // many to many custom pool and user
  @OneToMany((type) => UserInfoPoolInfosEntity, (UIPI) => UIPI.pool)
  userPool: UserInfoPoolInfosEntity[];

  // many to many custom pool and token
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
