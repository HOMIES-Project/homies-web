import { GroupsService } from './../../core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupCreationModel } from 'src/app/core/models/groupCreation.model';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username!: string;
  user: number = 1;
  sent: boolean = false;
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {}

  groupForm = this.formBuilder.group({
    user: 1,
    groupName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    groupRelation: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });

  open(content: any) {

    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(

        (result) => {

          let group: GroupCreationModel = new GroupCreationModel(
            this.user,
            this.groupForm.controls.groupName.value,
            this.groupForm.controls.groupRelation.value
          );
          this.sent = true

          this.groupsService.performGroupCreation(group).subscribe(
            (response) => {
              console.log(response);
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
    }
  }
}
