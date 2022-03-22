import { RegisterModel } from './../models/register.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { map } from 'rxjs/operators';
import { RecoveryModel } from '../models/recoveryPassword.model';


const LOGIN_KEY = 'login';
const REGISTER_KEY = 'register'

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private loginModelBehaviourSubject: BehaviorSubject<LoginModel | null>;
  public login: Observable<any | null>;

  constructor(private http: HttpClient, private route: Router) {
    this.loginModelBehaviourSubject = new BehaviorSubject<LoginModel | null>(
      JSON.parse(<string>localStorage.getItem(LOGIN_KEY))
    );
    this.login = this.loginModelBehaviourSubject.asObservable();
  }

  /* LOGIN - POST */

  performLogin(entry: LoginModel): Observable<LoginModel> {


    return this.http.post<LoginModel>(environment.loginUrl, entry).pipe(
      map((APIreturn) => {
        console.log(entry)
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
    console.log(this.login)
    this.route.navigate(['/login']);
  }

  /* REGISTER - POST */

  performRegister(entry: RegisterModel): Observable<RegisterModel> {
    console.log('performLogin(' + JSON.stringify(entry) + ')');

    return this.http.post<RegisterModel>(environment.registerUrl, entry)
  }

  /* PASSWORD RECOVERY - POST */

  performRecovery(entry: RecoveryModel): Observable<RecoveryModel> {
    console.log('performRecovery(' + JSON.stringify(entry) + ')');
    console.log("Recuperacion enviada")
    return this.http.post<RecoveryModel>(environment.recoveryUrl, entry)
  }

}
