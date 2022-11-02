import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { encrypt } from 'src/utils/crypto';
import { SuccResp } from 'src/utils/response';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
    });
    return user;
  }

  // 检索用户并验证密码
  async validateUser(username: string, pwd: string) {
    const user = await this.findByUsername(username);
    if (!user) return null;
    const encryptedPwd = encrypt(pwd, user.salt);
    console.log(encryptedPwd, user.password);
    if (user.password === encryptedPwd) {
      return user;
    }
    return null;
  }

  async login(user: Partial<User>) {
    const payload = {
      username: user.username,
      id: user.id,
    };
    return new SuccResp({
      token: this.jwtService.sign(payload),
    });
  }
}
