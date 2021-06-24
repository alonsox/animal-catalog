export abstract class HttpError<T> extends Error {
  private _status: number;
  private _reason?: T;

  constructor(status: number, msg: string, reason?: any) {
    super(msg);
    this._status = 403;
    this._reason = reason;
  }

  get status() {
    return this._status;
  }

  get reason() {
    return this._reason;
  }
}
