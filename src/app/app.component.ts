import { Router } from '@angular/router';
import { GroupsService } from './core/services/groups.service';
import { UsersService } from './core/services/users.service';
import { Component } from '@angular/core';
import { LoginModel } from './core/models/login.model';

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
  }

  ngOnInit(): void {
    // this.groupsService.getUserInfo(this.id).subscribe((response) => {
    //   this.username = response.user.firstName;
    // });
  }
  isLogged() {
    return this.user != null;
  }

  logout(): void {
    this.usersService.performLogout();
  }
}
