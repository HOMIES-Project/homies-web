export class LoginModel {
  public username: string;
  public password: string;
  public token: string;

  constructor(username: string, password: string, token: string) {
    this.username = username
    this.password = password
    this.token = token
  }
}
