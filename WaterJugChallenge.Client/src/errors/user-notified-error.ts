export class UserNotifiedError extends Error {
  public constructor(message: string) {
    super(message);
    this.name = 'UserNotifiedError';
  }
}
