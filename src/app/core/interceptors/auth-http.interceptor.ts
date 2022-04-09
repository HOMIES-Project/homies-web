import { GroupsService } from './../services/groups.service';
import { UsersService } from '../services/users.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginModel } from '../models/login.model';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {
  user!: LoginModel | null;
  token!: String | undefined;

  constructor(private usersService: UsersService) {
    this.usersService.login.subscribe((user) => {
      this.user = user?.id_token;
    });
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.user !== undefined) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.user}`,
        },
      });
    }

    return next.handle(request);
  }
}
