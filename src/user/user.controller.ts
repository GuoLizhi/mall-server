import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { encrypt, makeSalt } from 'src/utils/crypto';
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
    return this.authService.login(loginDto);
  }

  @Post('/regist')
  async regist(@Body() registDto: RegistDto) {
    const salt = makeSalt();
    registDto.salt = salt;
    registDto.password = encrypt(registDto.password, salt);
    return this.userService.save(registDto);
  }
}
