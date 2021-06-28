import { HttpError } from './http-error';

/** 
 * User must be authenticated and have permissions. Authentication will make 
 * no difference.
 */
export class ForbiddenError<T> extends HttpError<T> {
  constructor(msg: string, reason?: any) {
    super(403, msg, reason);
  }
}
