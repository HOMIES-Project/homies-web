import { TaskEditionModel } from './../../../../../core/models/tasksCreation.model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskCreationModel } from 'src/app/core/models/tasksCreation.model';
import { UsersService } from 'src/app/core/services/users.service';

import { GroupsService } from 'src/app/core/services/groups.service';
import { TasksService } from 'src/app/core/services/Lists/tasks.service';

@Component({
  selector: 'app-task-modal',
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css']
})
export class TaskModalComponent implements OnInit {

  @Input() isEditting!: boolean
  @Input() isCreating!: boolean
  @Input() taskFromChild!: any;


  username!: string;
  groupID!: string | null;
  userId!: string;
  sent: boolean = false;
  closeResult = '';
  newTaskForm: FormGroup;

  groupUsers!: Array<any>



  constructor(
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tasksService: TasksService,
  ) {
    this.newTaskForm = this.formBuilder.group({
      taskName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      ],
      taskDescription: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      ],
    });
  }

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
      console.log(this.groupID)
    });
    this.usersService.userId.subscribe((response) => {
      this.userId = response;
    });

    this.groupsService.groupInfo.subscribe(response =>{
      this.groupUsers = response.userData
      console.log(this.groupUsers)
    })


    if(this.isEditting) {
      this.newTaskForm.patchValue({
        taskName: this.taskFromChild.taskName,
        taskDescription: this.taskFromChild.description
      });
    }
  }

  openAddTask(addTask: any) {
    this.modalService.open(addTask, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
      (result)=>{

        this.closeResult = `Closed width: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)} `
      }
    )
  }
 // TODO edit task

  openEditTask(idTask: string, editTask: any) {
    this.modalService.open(editTask, { ariaLabelledBy: 'modal-basic-title' , size: 'lg'}).result.then(
      (result)=>{

        this.closeResult = `Closed width: ${result}`;

      },
      (reason) => {

        this.closeResult = `Dismissed ${this.getDismissReason(reason)} `
      }
    )
  }

  submitFormTask() {

    if(this.isCreating) {
      this.performCreateTask()
    } else {
      this.performEditTask()
    }
  }
  performCreateTask() {
    let task: TaskCreationModel = new TaskCreationModel(
      this.userId,
      this.groupID!,
      this.newTaskForm.controls.taskName.value,
      this.newTaskForm.controls.taskDescription.value

    );
    this.sent = true;
    this.tasksService.performTaskCreation(task).subscribe((response) => {
      console.log(task)
      console.log(response)
      console.log('tarea creada')
     window.location.reload()
      this.modalService.dismissAll()
    },
    (error) => {
    }
    );
  }

  performEditTask() {
    let task: TaskEditionModel = new TaskEditionModel(
      'esther13',
      this.groupID!,
      this.taskFromChild.id,
      this.newTaskForm.controls.taskName.value,
      this.newTaskForm.controls.taskDescription.value
    );
    this.sent = true;
    this.tasksService.performEditTask(task).subscribe((response) => {
      //this.router.navigate(['home/tasks', response.id])
    },
    (error) => {
      console.log(error);
    }
    );
  }


  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

