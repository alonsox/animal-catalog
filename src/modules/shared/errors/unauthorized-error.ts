import { HttpError } from './http-error';

/** User should be authenticate to access the content */
export class UnauthorizedError<T> extends HttpError<T> {
  constructor(msg: string, reason?: any) {
    super(401, msg, reason);
  }
}
