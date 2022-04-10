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

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {



    console.log("entro en el oninit")
    this.isLoading = true;
    this.usersService.userId.subscribe((response) => {
      this.userID = response;
    });

    this.usersService.user.subscribe((response) => {
      this.name = response?.user.firstName;
      this.surname = response?.user.lastName;
      this.photo = response?.photo;
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
        this.groupsService.getGroupInfo(id!).subscribe((response) => {
          console.log(response);
          this.groupName = response.groupName;
          this.groupRelationName = response.groupRelationName;
          this.groupUsers = response.userData;
          this.adminID = response.userAdmin.id;
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
          (response) => {
            let user = new GroupUserModel(
              response.id,
              response.user.login,
              response.photo,
              response.user.firstName,
              response.user.lastName,
              false
            );
            if (response.photo != null) {
              this.base64ProfileImage = `data:image/png;base64,${response.photo}`;
            }
            if (this.adminID == response.id) {
              user.admin = true;
            }
            console.log(user)
              this.groupUsersModel.push(user);
              console.log(this.groupUsersModel)
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
    console.log(this.groupUsersModel);
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
    console.log(this.groupUsers);

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

  profilePictureImageDecoded() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.base64ProfileImage
    );
  }
}
