import { GroupsService } from 'src/app/core/services/groups.service';
import { GroupCreationModel } from 'src/app/core/models/groupCreation.model';
import { UserData } from './../models/user-data.model';
import { RegisterModel } from '../models/register.model';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';
import { map, switchMap } from 'rxjs/operators';
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
  private userBehaviourSubject: BehaviorSubject<any | null>;
  public user: Observable<any | null>;

  constructor(
    private http: HttpClient,
    private route: Router,
    private groupsService: GroupsService
  ) {
    this.loginModelBehaviourSubject = new BehaviorSubject<LoginModel | null>(
      JSON.parse(<string>localStorage.getItem(LOGIN_KEY))
    );
    this.login = this.loginModelBehaviourSubject.asObservable();

    this.userIdBehaviourSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('id')
    );
    this.userId = this.userIdBehaviourSubject.asObservable();

    this.userBehaviourSubject = new BehaviorSubject<UserData | null>(
      JSON.parse(<string>localStorage.getItem('userInfo'))
    );
    this.user = this.userBehaviourSubject.asObservable();
  }

  /* LOGIN - POST */

  performLogin(entry: LoginModel): Observable<any> {
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
    localStorage.removeItem('id');
    localStorage.removeItem(LOGIN_KEY);
    localStorage.removeItem('userInfo');
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

  getUserInfo(id: string): Observable<any> {
    let url = `${environment.BASE_URL}/user-data/${id}`;
    return this.http.get<any>(url).pipe(
      map((response) => {
        console.log(response)

        this.userBehaviourSubject.next(response);
        localStorage.setItem('userInfo', JSON.stringify(response));

        return response;
      })
    );
  }

  /* EDIT USER - POST */
  performEditUser(entry: any, id: string): Observable<any> {
    let url = `${environment.BASE_URL}/user-data/${id}`;
    return this.http.put<any>(url, entry);
  }

  /* DELETE USER - DELETE*/

  performDeleteUser(id: string): Observable<any> {
    let url = `${environment.BASE_URL}/user-data/${id}`;
    return this.http.delete(url);
  }
}
