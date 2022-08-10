import { UserInfoRepository } from '../../models/repositories/user-info.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserInfoRepository, 'default')
    private userInfoRepository: UserInfoRepository,
  ) {}
}
