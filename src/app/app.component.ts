import { Router } from '@angular/router';
import { GroupsService } from './core/services/groups.service';
import { UsersService } from './core/services/users.service';
import { Component, HostListener } from '@angular/core';
import { LoginModel } from './core/models/login.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homies';

  user!: LoginModel | null;
  id!: string;
  username!: string | undefined;
  groupID!: string;


  userActivity:any;
  userInactive: Subject<any> = new Subject();

  constructor(
    private usersService: UsersService,
    private groupsService: GroupsService,
    private router: Router
  ) {
    usersService.login.subscribe((user) => {
      this.user = user;
    });
    usersService.userId.subscribe((id) => {
      this.id = id;
    });
    usersService.user.subscribe((response) => {
      this.username = response?.user.login;
    });
    this.setTimeout();
    this.userInactive.subscribe(() =>this.logout());
  }

  ngOnInit(): void {

  }

  isLogged() {
    return this.user != null;
  }

  logout(): void {
    this.usersService.performLogout();
  }



  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
