import { TasksService } from 'src/app/core/services/Lists/tasks.service';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/login.model';
import { GroupsService } from 'src/app/core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  user!: LoginModel | null;
  id!: string;
  username!: string | undefined;
  groupID!: string | null;
  groupName!: any | null;

  constructor(
    private usersService: UsersService,
    private groupsService: GroupsService,
    private tasksService: TasksService,
    private router: Router
  ) {
    this.usersService.login.subscribe((user) => {
      this.user = user;
    });
    this.usersService.userId.subscribe((id) => {
      this.id = id;
    });
    this.usersService.user.subscribe((response) => {
      this.username = response?.user.login;
    });
    this.groupsService.groupInfo.subscribe( response =>{
      this.groupName = response?.groupName
    })
    this.setTimeout();
    this.userInactive.subscribe(() =>this.logout());
  }

  ngOnInit(): void {}

  navigateToHomeGroupID() {
    this.router.navigate(['home']);
  }

  isLogged() {
    return this.user != null;
  }

  logout(): void {
    this.usersService.performLogout();
    this.groupsService.performLogoutFromGroups();
    this.tasksService.performLogoutFromTasks()
  }
  userActivity:any;
  userInactive: Subject<any> = new Subject();

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 900000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }
}
