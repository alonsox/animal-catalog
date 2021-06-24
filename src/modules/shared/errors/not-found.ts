import { HttpError } from './http-error';

export class NotFound<T> extends HttpError<T> {
  constructor(msg: string, reason?: any) {
    super(404, msg, reason);
  }
}
