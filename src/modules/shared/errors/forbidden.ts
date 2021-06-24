import { HttpError } from './http-error';

export class ForbiddenError<T> extends HttpError<T> {
  constructor(msg: string, reason?: any) {
    super(403, msg, reason);
  }
}
