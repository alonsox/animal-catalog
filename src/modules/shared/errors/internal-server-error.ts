import { HttpError } from './http-error';

export class InternalServerError<T> extends HttpError<T> {
  constructor(msg: string, reason?: any) {
    super(500, msg, reason);
  }
}
