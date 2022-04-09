import { UsersService } from 'src/app/core/services/users.service';
import { GroupsService } from '../../core/services/groups.service';
import { Component, OnInit } from '@angular/core';
import { GroupCreationModel } from 'src/app/core/models/groupCreation.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

  id!: number;
  groups!: Array<GroupCreationModel> | null;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService
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
}
