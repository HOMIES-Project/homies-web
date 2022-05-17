import { TaskCreationModel } from './../../../core/models/tasksCreation.model';
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

  isCancelled!: boolean;

  constructor(
    private tasksService: TasksService,
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((groupID) => {
      this.groupID = groupID;
    });

    this.tasksService.getTasksList(this.groupID!).subscribe((response) => {
      this.tasksList = response.tasks;
      console.log(this.tasksList);
      if (this.tasksList.length == 0) {
        this.noTasks = true;
      } else {
        this.noTasks = false;
      }
      console.log(this.groupID);
    });
  }

  // openNewTarea() {
  //   this.open = !this.open;
  // }

  editTaskFromList() {
    console.log("pulsado")
  }

  completeTask() {}

  onCheckboxChanged(event: any) {
    console.log(event.target.value);
    this.isCancelled = !this.isCancelled
  }

  get result() {
    this.tasksList.filter((item) => {
      item.checked;
      console.log(item);
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
            console.log(taskID)
            console.log(response)
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
}
