import { UserData } from '../../core/models/user-data.model';
import { GroupsService } from '../../core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';
import {
  GroupUserActionModel,
  GroupUserModel,
} from 'src/app/core/models/groupCreation.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  userID!: string;
  username!: string;
  name!: string | undefined;
  surname!: string | undefined;
  groupID!: string | null;
  login!: string | null;

  sub: any;

  groupsExist!: boolean;
  isLoading!: boolean;

  isLodingUsers: boolean = true;

  groupName!: string | null;
  groupRelationName!: string | null;
  groupUsers: Array<any> = [];
  groupUsersModelArray: Array<GroupUserModel> = [];
  groupUsersModel: Array<GroupUserModel> = [];
  groupUserID!: string | null;

  usersNames: Array<string> = [];
  usersPictures: Array<string> = [];

  base64ProfileImage!: string;
  photo!: string | undefined;

  paramID!: string | null;

  isAdmin!: boolean;
  adminID!: string;

  defaultGroup!: string;

  imgBase64!: string;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.imgBase64 = 'data:image/png;base64,';

    this.isLoading = true;
    this.usersService.userId.subscribe((userID) => {
      this.userID = userID;
    });

    //todo - check this subscribepo
    this.usersService.user.subscribe((userInfo) => {
      console.log(userInfo)
      this.name = userInfo?.user.firstName;
      this.surname = userInfo?.user.lastName;
      this.photo = userInfo?.photo;
      console.log(userInfo)
    });

    // this.groupsService.groupID.subscribe(response => {
    //   console.log(response)
    // });
    this.getGroupDetails();
  }

  // updateGroupID(id: string) {
  //   this.groupsService.updateGroupId(id).subscribe();
  // }

  getGroupDetails() {
    this.groupsService.groupID.subscribe((response) => {
      console.log(response)
      let id = response;
      if (id == null) {
        this.isLoading = false;
        this.groupsExist = false;
      } else {
        this.isLoading = false;
        this.groupsExist = true;
        this.paramID = id;
        this.groupsService.getGroupInfo(id!).subscribe((groupInfo) => {
          console.log(groupInfo);
          this.groupName = groupInfo.groupName;
          this.groupRelationName = groupInfo.groupRelationName;
          this.groupUsers = groupInfo.userData;
          this.adminID = groupInfo.userAdmin.id;
          this.checkIsAdmin();
          this.getUsersInfo();
        });
      }
    });
  }

  getUsersInfo() {
    if (this.groupUsers.length > 0) {
      for (var i = 0; i < this.groupUsers.length; i++) {
        this.groupUsersModelArray = [];
        this.groupsService.getUserInfo(this.groupUsers[i].id).subscribe(
          (groupUserInfo) => {
            this.login = groupUserInfo.user.login
            let user = new GroupUserModel(
              groupUserInfo.id,
              this.login!,
              groupUserInfo.photo,
              groupUserInfo.user.firstName,
              groupUserInfo.user.lastName,
              false
            );

            if (groupUserInfo.photo != null) {
              this.base64ProfileImage = `data:image/png;base64,${groupUserInfo.photo}`;
            }
            if (this.adminID == groupUserInfo.id) {
              user.admin = true;
              this.groupUsersModelArray.unshift(user);
            }

            this.groupUsersModelArray.push(user);
            this.groupUsersModel = [...new Set(this.groupUsersModelArray)];
          },
          (error) => {
            console.log('error from getusersinfo');
          },
          () => {
            if (i == this.groupUsers.length) this.isLodingUsers = false;
          }
        );
      }
    }
  }
  profilePictureImageDecoded(picture: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(picture);
  }

  checkIsAdmin() {
    if (this.adminID == this.userID) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }

  deleteUserFromGroup(login: string) {
    let userToDelete = new GroupUserActionModel(
      this.userID,
      login,
      this.paramID!
    );
    console.log(userToDelete.login);
    console.log(this.userID);
    Swal.fire({
      title: '¡Cuidado! Vas a eliminar un usuario',
      text: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34ade7',
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
      cancelButtonColor: '#df4759',
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupsService.performDeleteUserFromGroup(userToDelete).subscribe(
          (response) => {
            window.location.reload();
          },
          (error) => {}
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  exitGroup() {
    let userToDelete = new GroupUserActionModel(
      this.userID,
      this.login!,
      this.paramID!
    );
    console.log(userToDelete.login);
    console.log(this.userID);
    console.log(this.paramID);
    Swal.fire({
      title: '¡Cuidado! Vas a abandonar el grupo',
      text: 'Perderás toda la información',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34ade7',
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
      cancelButtonColor: '#df4759',
    }).then((result) => {
      if (result.isConfirmed) {
        this.groupsService.performDeleteUserFromGroup(userToDelete).subscribe(
          (response) => {
            window.location.reload();
          },
          (error) => {
            console.log(error)
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  //TODO delete group with ID

  // deleteGroup() {
  //   let entry = new GroupUserActionModel(
  //     this.userID,
  //     this.login!,
  //     this.groupID!
  //   )
  //   this.groupsService.performDeleteGroup(entry).subscribe(response => {
  //     console.log('NICE')

  //   }, error => {
  //     console.log(error)
  //   })
  // }
}
