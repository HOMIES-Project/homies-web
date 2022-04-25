import { LoginModel } from './login.model';
import { RegisterModel } from './register.model';
export class UserData {
  public id: string;
  public photo: string;
  public phone: string;
  public premium: boolean;
  public birthDate: string;
  public user: RegisterModel;

  constructor(
    id: string,
    photo: string,
    phone: string,
    premium: boolean,
    birthDate: string,
    user: RegisterModel
  ) {
    this.id = id;
    this.photo = photo;
    this.phone = phone;
    this.premium = premium;
    this.birthDate = birthDate;
    this.user = user;
  }
}

export class UserEditModel {
  public login: string;
  public firstName: string;
  public lastName: string;
  public email: string;
  public langkey: string;
  public phone: string;
  public photo: string;
  public photoContentType: string;
  public birthDate: string;

  constructor(
    login: string,
    firstName: string,
    lastName: string,
    email: string,
    langkey: string,
    phone: string,
    photo: string,
    photoContentType: string,
    birthDate: string
  ) {
    this.login = login;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.langkey = langkey;
    this.phone = phone;
    this.photo = photo;
    this.photoContentType = photoContentType;
    this.birthDate = birthDate;
  }
}

export class UserChangePassword {
  public password: LoginModel;
  public newPassword: RegisterModel;
  
  constructor(
    password: LoginModel,
    newPassword: RegisterModel
  ) {
    
    this.password = password;
    this.newPassword = newPassword;
  }
}