export class LoginDto {
  readonly username: string;
  readonly password: string;
}

export class RegistDto extends LoginDto {
  readonly nickname: string;
}
