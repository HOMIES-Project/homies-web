import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/login.model';
import { GroupsService } from 'src/app/core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user!: LoginModel | null;
  id!: string;
  username!: string |undefined
  groupID!: string | null

  constructor(private usersService: UsersService, private groupsService: GroupsService, private router: Router) {
    usersService.login.subscribe(user =>{
      this.user = user;
    })
    usersService.userId.subscribe(id => {
      this.id = id
    })
    usersService.user.subscribe(response =>{
      this.username = response?.user.login
    })
    groupsService.groupID.subscribe(response => {
      this.groupID = response
    })
  }

  ngOnInit(): void {

  }

  navigateToHomeGroupID() {
    this.router.navigate(['home', this.groupID]);
  }


  isLogged() {
    return this.user != null;
  }

  logout():void {
    this.usersService.performLogout();
    this.groupsService.performLogoutFromGroups();
  }


}


