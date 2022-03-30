import { RegisterModel } from '../models/register.model';
import { environment } from '../../../environments/environment';
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
    let url =  `${environment.BASE_URL}/authenticate`;
    return this.http.post<LoginModel>(url, entry).pipe(
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
    let url =  `${environment.BASE_URL}/register`;
    return this.http.post<RegisterModel>(url, entry)
  }


  /* ACTIVATION - POST */

  performActivation(entry: any): Observable<any> {
    let url =  `${environment.BASE_URL}/activate?key=${entry}`;
    console.log(url)
    return this.http.get(url)
  }

  /* PASSWORD RECOVERY - POST */

  checkEmailForRecovery(entry: RecoveryCheckModel): Observable<any> {
    let entryString = entry
    let url =  `${environment.BASE_URL}/account/reset-password/init`
    console.log(entryString)
    return this.http.post<RecoveryCheckModel>(url, entryString).pipe(
      map(APIreturn => {
        console.log(APIreturn)
        //Hacer algo
        return APIreturn;
      })
    );
  }

  performRecovery(entry: RecoveryModel): Observable<any> {
    let url =  `${environment.BASE_URL}/account/reset-password/finish`
    return this.http.post<RecoveryModel>(url, entry)
  }

}
