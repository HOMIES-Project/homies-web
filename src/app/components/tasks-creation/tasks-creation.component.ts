import { TasksModifyComponent } from './../tasks-modify/tasks-modify.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskCreationModel } from 'src/app/core/models/tasksCreation.model';
import { UsersService } from 'src/app/core/services/users.service';
import { TasksService } from 'src/app/core/services/tasks.service';

@Component({
  selector: 'app-tasks-creation',
  templateUrl: './tasks-creation.component.html',
  styleUrls: ['./tasks-creation.component.css'],
})
export class TasksCreationComponent implements OnInit {
  username!: string;
  id: number = 1;
  sent: boolean = false;
  closeResult = '';
  

  constructor(
    private modalService: NgbModal,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
  }

  newTaskForm = this.formBuilder.group({
    taskUser: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    taskDescription: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  addTask(): void{
    
    if(!this.newTaskForm.valid){
      return;
    }
    let task: TaskCreationModel = new TaskCreationModel(
      this.newTaskForm.value.taskUser,
      this.newTaskForm.value.taskDescription,
      this.newTaskForm.value.taskId,

    )

    
    this.tasksService
    .postTask(task.taskUser, task.taskDescription, task.taskId)
    .subscribe(
      (response) => {
        console.log(JSON.stringify(response))
        this.router.navigate(['/admin']);
      },
      (error) => {
      
      }, () =>{

      
      }
    );

    //refrescar la página
    //this.router.navigate(['/admin']);
  

  }


}
