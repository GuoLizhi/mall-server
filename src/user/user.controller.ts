import { Controller, Post } from '@nestjs/common';
import { LoginDto, RegistDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/login')
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    return this.userService.findOne(username, password);
  }

  @Post('/regist')
  async regist(registDto: RegistDto) {
    return this.userService.save(registDto);
  }
}
