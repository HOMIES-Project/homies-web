export class RegisterModel {
  public login: string;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public langKey: string;

  constructor(
    login: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    langkey: string
  ) {
    this.login = login;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
    this.langKey = langkey;
  }
}