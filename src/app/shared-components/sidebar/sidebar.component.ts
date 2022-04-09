import { UsersService } from 'src/app/core/services/users.service';
import { GroupsService } from '../../core/services/groups.service';
import { Component, OnInit } from '@angular/core';
import { GroupCreationModel } from 'src/app/core/models/groupCreation.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  id!: number;
  groups!: Array<any> | null;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService,
    private router: Router
  ) {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
  }

  ngOnInit(): void {
    this.groupsService.groupsList.subscribe((response) => {
      this.groups = response;
    });
  }

  navigateToHomeGroupID(id:string) {
    this.router.navigate(['home', id]);
  }
}
