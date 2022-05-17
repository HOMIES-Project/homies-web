import { GroupEditModel } from './../../../core/models/groupCreation.model';
import { Component, Input, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupCreationModel } from 'src/app/core/models/groupCreation.model';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { GroupsService } from '../../../core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-modal',
  templateUrl: './group-modal.component.html',
  styleUrls: ['./group-modal.component.css']
})
export class GroupModalComponent implements OnInit {

  username!: string;
  userId!: number;
  sent: boolean = false;
  closeResult = '';
  isLoading!: boolean;
  groupNameExists: boolean = false;
  groupForm: FormGroup
  groupID!: string | null
  userGroups: Array<any> | null = []

  @Input() isEditing!: boolean
  @Input() isCreating!: boolean
  @Input() groupInformation!: GroupEditModel



  constructor(
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {

  this.groupForm = this.formBuilder.group({
    groupName: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)],
    ],
    groupRelation: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(100)],
    ],
  });
  }
  ngOnInit(): void {
    console.log("id")
    this.usersService.userId.subscribe((response) => {
      this.userId = response;
      console.log(response)
    });

    this.groupsService.groupsList.subscribe(response => {
      this.userGroups = response
      console.log(response)
    })

    this.groupsService.groupID.subscribe(response => {
      this.groupID = response
      console.log(response)
    })
    if(this.isEditing) {
      this.groupsService.groupInfo.subscribe(response=> {
        this.groupForm.patchValue({
          groupName: response.groupName,
          groupRelation: response.groupRelationName

        });
      })
    }
  }


  openCreateGroup(content: any) {
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

  openEditGroup(content: any) {
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

  performCreateGroup() {
    let group: GroupCreationModel = new GroupCreationModel(
      '',
      this.userId,
      this.groupForm.controls.groupName.value,
      this.groupForm.controls.groupRelation.value
    );
    console.log(group)
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

  submitGroupForm() {
    if(this.isCreating) {
      this.performCreateGroup()
    } else {
      this.performEditGroup()
    }
  }

  performEditGroup() {
    let group: GroupEditModel = new GroupEditModel(
      this.groupForm.controls.groupName.value,
      this.groupForm.controls.groupRelation.value
    );
    console.log(group)
    this.sent = true;
    if (!this.groupForm.valid) return;
    this.isLoading = true;

    this.groupsService.performEditGroup(group, this.groupID!).subscribe(
      (response) => {
        this.isLoading = false;
        this.modalService.dismissAll()
        window.location.reload()
      },
      (error) => {
        console.log(error);
        this.isLoading = false;

      }
    );
  }

}
