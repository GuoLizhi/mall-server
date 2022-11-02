import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { encrypt, makeSalt } from 'src/utils/crypto';
import { ErrResp, SuccResp } from 'src/utils/response';
import { LoginDto, RegistDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const { username, password } = loginDto;
    const userSalt = await this.userService.getUserPwdSalt(username);
    if (!userSalt) {
      return new ErrResp('用户名或者密码错误');
    }
    const realPwd = encrypt(password, userSalt);
    const user = await this.userService.findOne(username, realPwd);
    if (user) {
      return new SuccResp({
        token: this.jwtService.sign(user),
      });
    } else {
      return new ErrResp('密码错误');
    }
  }

  @Post('/regist')
  async regist(@Body() registDto: RegistDto) {
    const salt = makeSalt();
    registDto.salt = salt;
    registDto.password = encrypt(registDto.password, salt);
    return this.userService.save(registDto);
  }
}
