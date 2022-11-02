import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrResp } from 'src/utils/response';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async save(user: Partial<User>) {
    const resp = await this.userRepository.save(user);
    return resp;
  }

  async findOne(username: string, password: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
        password,
      },
    });
    return user;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  async regist(user: User) {
    const u = await this.findByUsername(user.username);
    if (u) {
      return new ErrResp('当前用户已存在');
    }
  }

  async getUserPwdSalt(username: string) {
    const user = await this.userRepository.findOne({
      where: { username },
    });
    return user && user.salt ? user.salt : null;
  }
}
