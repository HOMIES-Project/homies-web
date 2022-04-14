import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskCreationModel } from 'src/app/core/models/tasksCreation.model';
import { UsersService } from 'src/app/core/services/users.service';


@Component({
  selector: 'app-tasks-creation',
  templateUrl: './tasks-creation.component.html',
  styleUrls: ['./tasks-creation.component.css']
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
/*
    taskForm = this.formBuilder.group({
      userName: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
      ],
      groupRelation: [
        '',
        [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
      ],
    });
*/



    /*open(content: any) {
      this.modalService
        .open(content, { ariaLabelledBy: 'modal-basic-title' })
        .result.then(
          (result) => {
            let group: TasksCreationModel = new TasksCreationModel(
              this.id,
              this.groupForm.controls.groupName.value,
              this.groupForm.controls.groupRelation.value
            );
            this.sent = true;
  
            this.groupsService.performGroupCreation(group).subscribe(
              (response) => {
  
                  this.router.navigate(['home', response.id]);
  
              },
              (error) => {
                console.log(error);
              }
            );
            this.closeResult = `Closed with: ${result}`;
          },
          (reason) => {
            console.log(reason);
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          }
        );
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
      }*/
  }

}