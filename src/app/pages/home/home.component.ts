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
  groupID!: string | null;
  isLoading!: boolean;

  groupsExist!: boolean;
  groupName!: string | null;
  groupRelationName!: string | null;
  groupUsers!: Array<any>;
  groupUserID!: string | null;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
    this.groupsService.getUserInfo(this.id).subscribe(
      (response) => {
        console.log(response);
        this.username = response.user.firstName;
        console.log(this.username)
        if (response.groups.length == 0) {
          this.isLoading = false;
          this.groupsExist = false;
        } else {
          this.isLoading = false;
          this.groupsExist = true;
          this.groupName = response.groups[0].groupName;
          this.groupRelationName = response.groups[0].groupRelationName;
          // this.groupUsers = response.groups[0].userData[0].id;
          this.groupUserID = response.groups[0].userData[0].id;
        }
        console.log(this.groupUserID);
      },
      (error) => {
        console.log(error);
      }
    );

    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
    });
  }
}
