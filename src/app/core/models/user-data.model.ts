import { RegisterModel } from './register.model';
export class UserData {
  public id: string;
  public photo: string;
  public phone: string;
  public premium: boolean;
  public birthDate: Date;
  public user: RegisterModel;

  constructor(
    id: string,
    photo: string,
    phone: string,
    premium: boolean,
    birthDate: Date,
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
