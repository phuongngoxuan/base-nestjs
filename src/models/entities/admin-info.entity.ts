import { IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'admins' })
export class AdminEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: 'wallet_address', unique: true })
  public walletAddress: string;

  @Column({ name: 'refresh_token' })
  public refreshToken: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: number;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt: number;
}
