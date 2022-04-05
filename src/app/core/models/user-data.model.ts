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
