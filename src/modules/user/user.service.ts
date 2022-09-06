import { UserInfoRepository } from '../../models/repositories/user-info.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfoRepository, 'master')
    private userInfoRepository: UserInfoRepository,
  ) {}

  userInfo = async () => {
    //example join user and history
    const data = this.userInfoRepository
      .createQueryBuilder('user_info')
      .leftJoinAndSelect('user_info.history', 'user_histories')
      .getMany();

    return data;
  };
}
