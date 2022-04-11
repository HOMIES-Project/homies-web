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

  sub: any;

  groupsExist!: boolean;
  isLoading!: boolean;

  isLodingUsers: boolean = true;

  groupName!: string | null;
  groupRelationName!: string | null;
  groupUsers: Array<any> = []
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

  imgBase64!:string;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.imgBase64 = 'data:image/png;base64,'


    this.isLoading = true;
    this.usersService.userId.subscribe((userID) => {
      this.userID = userID;
    });

    //todo - check this subscribepo
    this.usersService.user.subscribe((userInfo) => {
      this.name = userInfo?.user.firstName;
      this.surname = userInfo?.user.lastName;
      this.photo = userInfo?.photo;
    });

    this.groupsService.getUserInfo(this.userID).subscribe(
      (response) => {
        this.username = response.user.firstName;
      },
      (error) => {
        console.log(error);
      }
    );
    this.groupsService.groupID.subscribe();

    this.getGroupDetails();

  }


  updateGroupID(id: string) {
    this.groupsService.updateGroupId(id).subscribe();
  }

  getGroupDetails() {
    this.sub = this.route.paramMap.subscribe((params: ParamMap) => {
      let id = params.get('id');
      if (id == null) {
        this.isLoading = false;
        this.groupsExist = false;
      } else {
        this.isLoading = false;
        this.groupsExist = true;
        this.paramID = id;
        this.groupsService.getGroupInfo(id!).subscribe((groupInfo) => {
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
        this.groupUsersModel = []
        this.groupsService.getUserInfo(this.groupUsers[i].id).subscribe(
          (groupUserInfo) => {
            let user = new GroupUserModel(
              groupUserInfo.id,
              groupUserInfo.user.login,
              groupUserInfo.photo,
              groupUserInfo.user.firstName,
              groupUserInfo.user.lastName,
              false
            );
            //TODO check this if
            if (groupUserInfo.photo != null) {
              this.base64ProfileImage = `data:image/png;base64,${groupUserInfo.photo}`;
            }
            if (this.adminID == groupUserInfo.id) {
              user.admin = true;
            }
              this.groupUsersModel.push(user);
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
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      picture
    );
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
      console.log(userToDelete.login)
      console.log(this.userID)
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
            console.log('usuario eliminado');
            window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }


}
