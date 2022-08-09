import { Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class UserDto {
  id: number;

  @Column()
  userAddress: string;

  @Column()
  amount: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
