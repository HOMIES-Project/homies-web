import { GroupsService } from 'src/app/core/services/groups.service';
import { GroupUserActionModel } from './../../../core/models/groupCreation.model';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-add-group',
  templateUrl: './user-add-group.component.html',
  styleUrls: ['./user-add-group.component.css']
})
export class UserAddGroupComponent implements OnInit {

  @Input() idGroup!: string;
  @Input() idAdminGroup!: string;

  username!: string;
  id: number = 1;
  sent: boolean = false;
  closeResult = '';
  isLoading!: boolean;
  errorMessage!: string;

  userExists: boolean = true
  constructor(private formBuilder: FormBuilder,  private modalService: NgbModal, private groupsService: GroupsService) { }

  ngOnInit(): void {

  }

  groupForm = this.formBuilder.group({
    login: [
      '',
      [Validators.required],
    ],
  });

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title', centered: true })
      .result.then(
        (result) => {

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

      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {

      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  addUserToGroup() {
    let group: GroupUserActionModel = new GroupUserActionModel(
      this.idAdminGroup,
      this.groupForm.controls.login.value,
      this.idGroup
    );
    this.sent = true;

    if (!this.groupForm.valid) return;
    this.isLoading = true;

    this.groupsService.performAddUserToGroup(group).subscribe(
      (response) => {
        this.userExists =  true;
        window.location.reload()
        this.isLoading = false;
      },
      (error) => {
        console.log(error.error.errorKey)
        if(error.error.errorKey == 'userexists') {
          this.errorMessage = 'El usuario ya pertenece al grupo'
        }
        if (error.error.errorKey == 'UserDoesNotExist') {
          this.errorMessage = 'El usuario no existe'
        }
        this.userExists =  false;
        this.isLoading = false;
      }
    );
  }

}
