import { UserData } from '../../core/models/user-data.model';
import { GroupsService } from '../../core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id!: string;
  username!: string;
  name!: string | undefined;
  surname!: string | undefined;
  groupID!: string | null;
  isLoading!: boolean;

  sub: any;

  groupsExist!: boolean;
  groupName!: string | null;
  groupRelationName!: string | null;
  groupUsers!: Array<any>;
  groupUserID!: string | null;

  base64ProfileImage!: string;
  photo!: string | undefined;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });

    this.usersService.user.subscribe((response) => {
      this.name = response?.user.firstName;
      this.surname = response?.user.lastName;
      (this.photo = response?.photo);
    });

    this.groupsService.getUserInfo(this.id).subscribe(
      (response) => {
        this.username = response.user.firstName;

        if (response.groups.length == 0) {
          this.isLoading = false;
          this.groupsExist = false;
        } else {
          this.isLoading = false;
          this.groupsExist = true;
          // this.groupName = response.groups[1].groupName;
          // this.groupRelationName = response.groups[1].groupRelationName;
          // // this.groupUsers = response.groups[0].userData[0].id;
          // this.groupUserID = response.groups[1].userData[0].id;
        }
      },
      (error) => {
        console.log(error);
      }
    );

    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
    });

    this.getGroupDetails();
  }

  getGroupDetails() {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      this.groupsService.getGroupInfo(id!).subscribe((response) => {
        console.log(response);
        this.groupName = response.groupName;
        this.groupRelationName = response.groupRelationName;
        this.groupUsers = response.userData;
        for (var i = 0; i < response.userData.length; i++) {
          this.photo = response.userData[i].photo;

          this.base64ProfileImage = `data:image/png;base64,${this.photo}`;
        }
        console.log(this.groupUsers);
      });
    });
  }

  profilePictureImageDecoded() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.base64ProfileImage
    );
  }
}
