import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TaskCreationModel } from 'src/app/core/models/tasksCreation.model';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-task-delete',
  templateUrl: './tasks-delete.component.html',
  styleUrls: ['./tasks-delete.component.css'],
})
export class TasksDeleteComponent implements OnInit {
  username!: string;
  id: number = 1;
  sent: boolean = false;
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
