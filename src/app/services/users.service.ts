import { RegisterModel } from './../models/register.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { map } from 'rxjs/operators';
import { RecoveryCheckModel, RecoveryModel } from '../models/recoveryPassword.model';


const LOGIN_KEY = 'login';
const REGISTER_KEY = 'register'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private loginModelBehaviourSubject: BehaviorSubject<LoginModel | null>;
  public login: Observable<any | null>;
  private loginNameBehaviourSubject: BehaviorSubject<string | null>;
  public name: Observable<any | null>;


  constructor(private http: HttpClient, private route: Router) {
    this.loginModelBehaviourSubject = new BehaviorSubject<LoginModel | null>(
      JSON.parse(<string>localStorage.getItem(LOGIN_KEY))
    );
    this.login = this.loginModelBehaviourSubject.asObservable();
    this.loginNameBehaviourSubject = new BehaviorSubject<string | null> (
    localStorage.getItem('username'))
    this.name=this.loginNameBehaviourSubject.asObservable()
  }

  /* LOGIN - POST */

  performLogin(entry: LoginModel): Observable<LoginModel> {
    return this.http.post<LoginModel>(environment.loginUrl, entry).pipe(
      map((APIreturn) => {
        this.loginNameBehaviourSubject.next(entry.username)
        localStorage.setItem('username', entry.username)
        //Hacer algo
        console.log('Login ok' + JSON.stringify(APIreturn));
        this.loginModelBehaviourSubject.next(APIreturn);
        localStorage.setItem(LOGIN_KEY, JSON.stringify(APIreturn));
        return APIreturn;
      })
    );
  }

  performLogout() {
    localStorage.removeItem(LOGIN_KEY);
    this.loginModelBehaviourSubject.next(null);
    this.loginNameBehaviourSubject.next(null);

    this.route.navigate(['/login']);
  }

  /* REGISTER - POST */

  performRegister(entry: RegisterModel): Observable<RegisterModel> {
    return this.http.post<RegisterModel>(environment.registerUrl, entry)
  }

  /* PASSWORD RECOVERY - POST */

  checkEmailForRecovery(entry: RecoveryCheckModel): Observable<any> {
    let entryString = entry.email
    console.log(entryString)
    return this.http.post<RecoveryCheckModel>(environment.recoveryUrl, entryString).pipe(
      map(APIreturn => {
        console.log(APIreturn)
        //Hacer algo
        return APIreturn;
      })
    );
  }

  // performRecovery(entry: RecoveryModel): Observable<any> {
  //   return this.http.post<RecoveryModel>(environment.recoveryUrl, entry)
  // }

}
