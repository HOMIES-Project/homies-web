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


  tasksList: Array<any> = []
  noTasks: boolean = true
  allTasksList!: Array<any>


  constructor(
    private tasksService: TasksService,
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((groupID) => {
      this.groupID = groupID;
    });

    this.tasksService.getTasksList().subscribe(response =>{
      this.allTasksList = response
      this.getMyTask()

      if (this.tasksList.length == 0) {
        this.noTasks = true
      } else {

        this.noTasks = false
      }

    })
  }

  getMyTask(){
    for (var i = 0; i < this.allTasksList.length; i++) {
      if (this.groupID == this.allTasksList[i].taskList.id) {
        this.tasksList.push(this.allTasksList[i])
      }
    }
  }


  openNewTarea() {
    this.open = !this.open;

  }

  completeTask() {

  }

  onCheckboxChanged(event: any){
    console.log(event.target.value)
  }

  get result() {
this.tasksList.filter(item => {
  item.checked;
  console.log(item)
})
    return this.tasksList.filter(item => item.checked)
  }

  deleteTask(taskID:number) {
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
}
