import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  user!: LoginModel | null;
  constructor(private usersService: UsersService, private router: Router) {
    this.usersService.login.subscribe((user) => {
      this.user = user;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.user) {
      window.alert('Tienes que iniciar sesión para acceder a esta página');
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }
}
