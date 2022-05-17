import { GroupEditModel } from './../../core/models/groupCreation.model';

import { TaskModel } from './../../core/models/tasksCreation.model';
import { TasksService } from 'src/app/core/services/Lists/tasks.service';
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

  isAdmin!: boolean;
  adminID!: string;

  defaultGroup!: string;

  imgBase64!: string;

  userTasks: Array<any> = []
  userTasksModel: Array<any> = []

  noTasks: boolean = true;

  userTasksModelArray: Array<any> = []

  isEditing: boolean = true;
  isCreating: boolean = true;
  groupInformation!: GroupEditModel;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService,
    private tasksService: TasksService,
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
      this.login = userInfo.user.login;
      this.name = userInfo?.user.firstName;
      this.surname = userInfo?.user.lastName;
      this.photo = userInfo?.photo;
    });

    this.groupsService.getUserInfo(this.userID).subscribe((response) => {

    });

    this.getGroupDetails();
    this.getUserTasks();
  }

  getGroupDetails() {
    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
      if (this.groupID == null) {
        this.isLoading = false;
        this.groupsExist = false;
      } else {
        this.isLoading = false;
        this.groupsExist = true;

        this.groupsService.getGroupInfo(this.groupID).subscribe((groupInfo) => {
          this.groupName = groupInfo.groupName;
          this.groupRelationName = groupInfo.groupRelationName;
          this.groupUsers = groupInfo.userData;
          this.adminID = groupInfo.userAdmin.id;
          this.groupInformation = new GroupEditModel(
            this.groupName = groupInfo.groupName,
            this.groupRelationName = groupInfo.groupRelationName
          )
          if (this.groupUsers.length > 0) {
            this.groupUsersModelArray = [];
            for (var i = 0; i < this.groupUsers!.length; i++) {
              let user = new GroupUserModel(
                this.groupUsers![i].id,
                this.groupUsers![i].user.login,
                this.groupUsers![i].photo,
                this.groupUsers![i].user.firstName,
                this.groupUsers![i].user.lastName,
                false
              );
              if (this.groupUsers![i].photo != null) {
                this.base64ProfileImage = `data:image/png;base64,${
                  this.groupUsers![i].photo
                }`;
              }
              if (this.adminID == this.groupUsers![i].id) {
                user.admin = true;
                this.groupUsersModelArray.unshift(user);
              }
              this.groupUsersModelArray.push(user);
            }
            this.groupUsersModel = [...new Set(this.groupUsersModelArray)];
            if (i == this.groupUsers.length) this.isLodingUsers = false;
          }
          this.checkIsAdmin();
        });
      }
    });
  }

  profilePictureImageDecoded(picture: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(picture);
  }

  checkIsAdmin() {
    // this.adminID == this.userID ? this.isAdmin : !this.isAdmin
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
      this.groupID!
    );
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
      this.groupID!
    );

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
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }

  //TODO delete group with ID

  deleteGroup() {
    this.groupsService.performDeleteGroup(this.groupID!).subscribe(
      (response) => {
        console.log(response)
        this.groupsService.performLogoutFromGroups();
        this.usersService.performLogout();
      },
      (error) => {
      }
    );
  }

  getUserTasks() {
    this.groupsService.groupID.subscribe((response) => {
        this.groupID = response;

        this.userTasksModel = []


        this.tasksService
          .getUserTasksList(this.groupID!, this.login!)
          .subscribe((response) => {

            this.userTasks = response;
            if(this.userTasks.length > 0) {

              this.noTasks = false;

              this.userTasksModel = []
              for (var i = 0; i < this.userTasks!.length; i++) {
                let task = new TaskModel(
                  this.username,
                  this.userTasks![i].taskName,
                  this.userTasks![i].description,
                );

                this.userTasksModel.push(task)
              }

            } else {
              this.noTasks = true;

            }
          });
    });


  }

  navigateToTasks() {
    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
    });
    this.router.navigate(['/home', 'tasks', this.groupID], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }


  navigateToGroceries() {
    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
    });
    this.router.navigate(['/home', 'groceries', this.groupID], {
      relativeTo: this.route,
      queryParamsHandling: 'preserve',
    });
  }

}
