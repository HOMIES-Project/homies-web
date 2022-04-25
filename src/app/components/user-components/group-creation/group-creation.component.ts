import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupCreationModel } from 'src/app/core/models/groupCreation.model';
import { FormBuilder, Validators } from '@angular/forms';
import { GroupsService } from '../../../core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-creation',
  templateUrl: './group-creation.component.html',
  styleUrls: ['./group-creation.component.css'],
})
export class GroupCreationComponent implements OnInit {
  username!: string;
  userId!: number;
  sent: boolean = false;
  closeResult = '';
  isLoading!: boolean;
  groupNameExists: boolean = false;

  userGroups: Array<any> | null = []

  constructor(
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.usersService.userId.subscribe((response) => {
      this.userId = response;
    });

    this.groupsService.groupsList.subscribe(response => {
      this.userGroups = response
    })
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
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
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

  updateGroupID(id:string) {
    this.groupsService.updateGroupId(id!).subscribe()
  }

  createGroup() {
    let group: GroupCreationModel = new GroupCreationModel(
      '',
      this.userId,
      this.groupForm.controls.groupName.value,
      this.groupForm.controls.groupRelation.value
    );
    this.sent = true;
    if (!this.groupForm.valid) return;
    this.isLoading = true;

    this.groupsService.performGroupCreation(group).subscribe(
      (response) => {
        console.log(response)
        this.userGroups?.push(response)
        this.groupsService.updateListOfGroups(this.userGroups)
        this.groupNameExists = false
        this.router.navigate(['home']);
        this.isLoading = false;
        this.modalService.dismissAll()
      },
      (error) => {
        console.log(error);
        this.isLoading = false;
        this.groupNameExists = true
      }
    );
  }
}
