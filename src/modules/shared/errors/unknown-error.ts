export class UnknownError<T> extends Error {
  private _reason?: T;

  constructor(msg: string, reason?: T) {
    super(msg);
    this._reason = reason;
  }

  get reason() {
    return this._reason;
  }
}
