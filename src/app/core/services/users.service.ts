import { RegisterModel } from '../models/register.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { map } from 'rxjs/operators';
import {
  RecoveryCheckModel,
  RecoveryModel,
} from '../models/recoveryPassword.model';

const LOGIN_KEY = 'login';

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  //OBSERVABLE - TOKEN
  private loginModelBehaviourSubject: BehaviorSubject<LoginModel | null>;
  public login: Observable<any | null>;

  //OBSERVABLE - ID
  private userIdBehaviourSubject: BehaviorSubject<string | null>;
  public userId: Observable<any | null>;

  //OBSERVABLE - USER
  private userBehaviourSubject: BehaviorSubject<RegisterModel | null>;
  public user: Observable<RegisterModel | null>;

  constructor(private http: HttpClient, private route: Router) {
    this.loginModelBehaviourSubject = new BehaviorSubject<LoginModel | null>(
      JSON.parse(<string>localStorage.getItem(LOGIN_KEY))
    );
    this.login = this.loginModelBehaviourSubject.asObservable();
    this.userIdBehaviourSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('id')
    );
    this.userId = this.userIdBehaviourSubject.asObservable();
    this.userBehaviourSubject = new BehaviorSubject<RegisterModel | null>(
      JSON.parse(<string>localStorage.getItem('userInfo'))
    );
    this.user = this.userBehaviourSubject.asObservable();
  }

  /* LOGIN - POST */

  performLogin(entry: LoginModel): Observable<LoginModel> {
    let url = `${environment.BASE_URL}/authenticate`;
    return this.http.post<any>(url, entry).pipe(
      map((APIreturn) => {
        this.userIdBehaviourSubject.next(APIreturn.id);
        localStorage.setItem('id', APIreturn.id);
        this.loginModelBehaviourSubject.next(APIreturn);
        localStorage.setItem(LOGIN_KEY, JSON.stringify(APIreturn));
        return APIreturn;
      })
    );
  }

  performLogout() {
    localStorage.removeItem(LOGIN_KEY);
    this.loginModelBehaviourSubject.next(null);
    this.userIdBehaviourSubject.next(null);
    this.userBehaviourSubject.next(null);
    this.route.navigate(['/login']);
  }

  /* REGISTER - POST */
  performRegister(entry: RegisterModel): Observable<RegisterModel> {
    let url = `${environment.BASE_URL}/register`;
    return this.http.post<RegisterModel>(url, entry);
  }

  /* ACTIVATION - POST */
  performActivation(entry: any): Observable<any> {
    let url = `${environment.BASE_URL}/activate?key=${entry}`;
    console.log(url);
    return this.http.get(url);
  }

  /* PASSWORD RECOVERY - POST */
  checkEmailForRecovery(entry: RecoveryCheckModel): Observable<any> {
    let entryString = entry;
    let url = `${environment.BASE_URL}/account/reset-password/init`;

    return this.http.post<RecoveryCheckModel>(url, entryString).pipe(
      map((APIreturn) => {
        console.log(APIreturn);
        return APIreturn;
      })
    );
  }

  performRecovery(entry: RecoveryModel): Observable<any> {
    let url = `${environment.BASE_URL}/account/reset-password/finish`;
    return this.http.post<RecoveryModel>(url, entry);
  }

  /* GET USER INFO - GET*/

  getUserInfo(id: number): Observable<any> {
    let url = `${environment.BASE_URL}/user-data/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        let user: RegisterModel = new RegisterModel(
          response.user.id,
          response.user.login,
          response.user.email,
          response.user.password,
          response.user.firstName,
          response.user.lastName,
          response.user.langKey,
          response.user.activated
        );
        this.userBehaviourSubject.next(user);
        localStorage.setItem('userInfo', JSON.stringify(user));
        console.log(localStorage.getItem('userInfo'));
        return response;
      })
    );
  }

  /* DELETE USER - DELETE*/

  performDeleteUser(id: number): Observable<any> {
    let url = `${environment.BASE_URL}/user-data/${id}`;
    return this.http.delete(url);
  }
}
