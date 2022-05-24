import {
  TaskCreationModel,
  TaskCancelModel,
} from './../../../core/models/tasksCreation.model';
import { Component, OnInit } from '@angular/core';
import { GroupsService } from 'src/app/core/services/groups.service';
import { TasksService } from 'src/app/core/services/Lists/tasks.service';

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

  tasksList: Array<any> = [];
  noTasks: boolean = true;
  allTasksList!: Array<any>;

  display!: boolean;

  isCancelled!: boolean
  login!: string;

  constructor(
    private tasksService: TasksService,
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((groupID) => {
      this.groupID = groupID;
    });
    this.usersService.user.subscribe((userLogin) => {
      this.login = userLogin.user.login;
    });

    this.tasksService.getTasksList(this.groupID!).subscribe((response) => {
      this.tasksList = response.tasks;
      console.log(response);
      if (this.tasksList.length == 0) {
        this.noTasks = true;
      } else {
        this.noTasks = false;
      }
    });
  }

  // openNewTarea() {
  //   this.open = !this.open;
  // }

  editTaskFromList() {}

  completeTask() {}


  get result() {
    this.tasksList.filter((item) => {
      item.checked;
    });
    return this.tasksList.filter((item) => item.checked);
  }

  deleteTask(taskID: number) {
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
        this.tasksService.performDeleteTask(taskID).subscribe(
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

  cancelTask(idTask: number, isCancelled: boolean) {
    this.isCancelled = !isCancelled;
    let taskToCancel = new TaskCancelModel(
      idTask,
      this.groupID!,
      this.login,
      this.isCancelled
    );
    console.log(taskToCancel);
    this.tasksService.performCancelTask(taskToCancel).subscribe(
      (response) => {
        window.location.reload()
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
