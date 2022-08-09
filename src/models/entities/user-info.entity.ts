import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_infos')
export class UserInfoEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ name: 'user_address' })
  userAddress: string;

  @ApiProperty()
  @Column()
  amount: string;

  @ApiProperty()
  @Column({ name: 'start_stake' })
  startStake: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

export enum UserInfoStatus {
  Pending = 'pending',
  Claim = 'claim',
  Complete = 'complete',
  Failed = 'failed',
}

export const EmptyUserInfo = {
  id: 0,
  userAddress: '',
  amount: '0',
  startStake: '0',
  createdAt: new Date(),
  updatedAt: new Date(),
};

export function createUserInfoWithParam(
  address: string,
  startStake: string,
): UserInfoEntity {
  const userInfo = {
    id: 0,
    userAddress: '',
    amount: '0',
    startStake: '0',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  userInfo.userAddress = address;
  userInfo.startStake = startStake;
  return userInfo;
}
