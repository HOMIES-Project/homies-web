import { GroupCreationModel } from 'src/app/core/models/groupCreation.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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

  username!: string;
  groupID!: string | null;
  userId!: string;
  sent: boolean = false;
  closeResult = '';



  constructor(
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    private tasksService: TasksService,
  ) {}

  ngOnInit(): void {
    this.groupsService.groupID.subscribe((response) => {
      this.groupID = response;
    });
    this.usersService.userId.subscribe((response) => {
      this.userId = response;
    });

    this.groupsService.groupInfo.subscribe(response =>{
      console.log(response)
    })

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

  openAddTask(addTask: any) {
    this.modalService.open(addTask, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result)=>{
        let task: TaskCreationModel = new TaskCreationModel(
          this.userId,
          this.groupID!,
          this.newTaskForm.controls.taskUser.value,
          this.newTaskForm.controls.taskDescription.value

        );
        this.sent = true;
        this.tasksService.performTaskCreation(task).subscribe((response) => {
          this.router.navigate(['home/tasks', response.id])
        },
        (error) => {
          console.log(error);
        }
        );
        this.closeResult = `Closed width: ${result}`;
      },
      (reason) => {
        console.log(reason);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)} `
      }
    )
  }
  //TODO edit task

  openEditTask(editTask: any) {
    this.modalService.open(editTask, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result)=>{
        let task: TaskCreationModel = new TaskCreationModel(
          this.userId,
          this.groupID!,
          this.newTaskForm.controls.taskUser.value,
          this.newTaskForm.controls.taskDescription.value

        );
        console.log(task)
        this.sent = true;
        this.tasksService.performTaskCreation(task).subscribe((response) => {
          this.router.navigate(['home/tasks', response.id])
        },
        (error) => {
          console.log(error);
        }
        );
        this.closeResult = `Closed width: ${result}`;
      },
      (reason) => {
        console.log(reason);
        this.closeResult = `Dismissed ${this.getDismissReason(reason)} `
      }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      console.log('ùlso x');
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      console.log('ùlso y');
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}

