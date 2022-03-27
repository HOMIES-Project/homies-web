import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user!: LoginModel | null


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user != null;
  }
  constructor(private usersService: UsersService) {
    this.usersService.login.subscribe(user => {
      this.user = user
    })
  }

}
