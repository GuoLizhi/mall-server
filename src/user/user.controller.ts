import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { encrypt, makeSalt } from 'src/utils/crypto';
import { ErrResp } from 'src/utils/response';
import { LoginDto, RegistDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    if (user) {
      return this.authService.login(loginDto);
    } else {
      return new ErrResp('用户名或密码错误');
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
