export class Response<T> {

  data: T;
  message: string;
  code: number;

  constructor(data: T, message: string, code: number) {
    this.data = data;
    this.message = message;
    this.code = code;
  }

  static success(data: any, message: string = 'success') {
    return new Response(data, message, 200);
  }

  static error(message: string, code: number) {
    return new Response(null, message, code);
  }
}