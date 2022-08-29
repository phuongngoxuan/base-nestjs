import { ApiProperty } from '@nestjs/swagger';
import { UserHistoryEntity } from './user-history.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';

@Entity('user_infos')
export class UserInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_address' })
  userAddress: string;

  @Column()
  amount: string;

  @Column({ name: 'start_stake' })
  startStake: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany((type) => UserHistoryEntity, (history) => history.user)
  history: UserHistoryEntity[];
}
