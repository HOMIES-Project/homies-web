import { UsersService } from 'src/app/core/services/users.service';
import { GroupsService } from '../../core/services/groups.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  id!: string;
  groups!: Array<any> | null;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.usersService.userId.subscribe((response) => {
      console.log(this.id)
      console.log(this.id)
      this.id = response;
    });
  }

  ngOnInit(): void {
    this.groupsService.getUserInfo(this.id).subscribe((response) => {
      this.groups = response.groups;
      console.log(response)
    });
  }

  navigateToHomeGroupID(id:string) {
    this.router.navigate(['home', id]);
  }
}
