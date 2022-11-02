export class SuccResp {
  data: any;
  message: string;
  code: number;
  constructor(data: any) {
    this.message = '成功';
    this.code = 0;
    this.data = data;
  }
}

export class ErrResp {
  data: any;
  message: string;
  code: number;
  constructor(message = '系统错误，请稍后重试', code = -1) {
    this.message = message;
    this.code = code;
    this.data = {};
  }
}
