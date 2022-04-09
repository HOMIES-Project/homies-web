import { UserData } from '../../core/models/user-data.model';
import { GroupsService } from '../../core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id!: string;
  username!: string;
  groupID!: string |null

  groupName!: string | null;
  groupUsers!: Array<any>

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
    this.groupsService.getUserInfo(this.id).subscribe((response) => {
      console.log(response);
      this.username = response.user.firstName;
      this.groupName = response.groups[0].groupName
      this.groupUsers = response.groups[0].userData.id
      console.log(this.groupUsers)
    });

    this.groupsService.groupID.subscribe(response => {
      this.groupID = response
    })
  }
}
