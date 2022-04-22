import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/core/services/groups.service';
import { TasksService } from 'src/app/core/services/tasks.service';
import { UsersService } from 'src/app/core/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  open: boolean = true;
  groupID!: string | null;

  isEditting: boolean = true;
  isCreating: boolean = true;

  constructor(
    private tasksService: TasksService,
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((groupID) => {
      this.groupID = groupID;
    });
  }
  /* ESTO ESTÁ A MEDIO HACER Y LO COMENTO PARA QUE NO DE ERRORES Y MIERDAS

   getTasks(){
    this.tasksService.getTasks(this.groupID!).subscribe((groupInfo) => {
      this.groupName = groupInfo.groupName;
      this.groupRelationName = groupInfo.groupRelationName;
      this.groupUsers = groupInfo.userData;
      this.adminID = groupInfo.userAdmin.id;
      this.checkIsAdmin();
      this.getUsersInfo();
    })
  }
  */

  openNewTarea() {
    this.open = !this.open;
    console.log(this.open);
  }

  deleteTask() {
    console.log('eliminada');
    Swal.fire({
      title: '¡Cuidado! Vas a eliminar una tarea',
      text: '¿Estás seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34ade7',
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
      cancelButtonColor: '#df4759',
    }).then((result) => {
      if (result.isConfirmed) {
        // this.groupsService.performDeleteUserFromGroup(userToDelete).subscribe(
        //   (response) => {
        //     window.location.reload();
        //   },
        //   (error) => {}
        // );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
