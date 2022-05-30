export class RecoveryCheckModel {
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}

export class RecoveryModel {
  public key: string;
  public newPassword: string;

  constructor(key: string, newPassword: string) {
    this.key = key;
    this.newPassword = newPassword;
  }
}
