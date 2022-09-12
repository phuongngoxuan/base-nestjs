import { PoolInfoEntity } from './pool-info.entity';
import { UserInfoEntity } from './user-info.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity('user_infos_pool_infos')
export class UserInfoPoolInfosEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'pool_id' })
  poolId: number;

  // custom many to many user and pool
  @ManyToOne((type) => UserInfoEntity, (user) => user.userPool, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UserInfoEntity;

  // custom many to many pool and user
  @ManyToOne((type) => PoolInfoEntity, (pool) => pool.userPool)
  @JoinColumn({ referencedColumnName: 'id', name: 'pool_id' })
  pool: PoolInfoEntity;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
