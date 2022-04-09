import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupCreationModel } from 'src/app/core/models/groupCreation.model';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupsService } from '../../../core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.css'],
})
export class GroupCreationComponent implements OnInit {
  username!: string;
  id: number = 1;
  sent: boolean = false;
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) {}
  ngOnInit(): void {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
  }

  groupForm = this.formBuilder.group({
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
            this.id,
            this.groupForm.controls.groupName.value,
            this.groupForm.controls.groupRelation.value
          );
          this.sent = true;

          this.groupsService.performGroupCreation(group).subscribe(
            (response) => {
              console.log(response);
              window.location.reload()
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
