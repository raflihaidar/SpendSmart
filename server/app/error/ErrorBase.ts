export class ErrorBase<T extends string> extends Error {
  code: T;
  message: string;
  statusCode: number;
  statusMessage: string;

  constructor({
    code,
    message,
    statusCode,
    statusMessage,
  }: {
    code: T;
    message: string;
    statusCode: number;
    statusMessage: string;
  }) {
    super(message);
    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
    this.statusMessage = statusMessage;
  }
}
