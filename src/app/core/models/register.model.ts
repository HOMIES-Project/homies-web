
export class RegisterModel {
  public id: string;
  public login: string;
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public langKey: string;
  public activated: boolean

  constructor(
    id: string,
    login: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    langKey: string,
    activated: boolean
) {
    this.id = id
    this.login = login
    this.email = email
    this.password = password
    this.firstName = firstName
    this.lastName = lastName
    this.langKey = langKey
    this.activated = activated
  }

}
