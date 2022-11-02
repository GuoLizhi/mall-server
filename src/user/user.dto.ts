import { IsString, Length, Matches } from 'class-validator';

export class LoginDto {
  @Length(4, 10, {
    message: '请输入4-10个字符',
  })
  @IsString({
    message: '用户名格式不正确',
  })
  readonly username: string;

  @Length(4, 100, {
    message: '密码格式不正确',
  })
  @IsString({
    message: '密码格式不正确',
  })
  password: string;
}

export class RegistDto extends LoginDto {
  @Length(4, 10, {
    message: '请输入4-10个字符',
  })
  @IsString({
    message: '昵称格式不正确',
  })
  readonly nickname: string;

  salt: string;
}
