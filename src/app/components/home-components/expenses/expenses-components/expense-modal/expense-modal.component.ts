import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupsService } from 'src/app/core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css']
})
export class ExpenseModalComponent implements OnInit {
  @Input() isEditting!: boolean
  @Input() isCreating!: boolean
  @Input() expenseFromChild!: any

  groupUsers!: Array<any>
  newExpenseForm!: FormGroup
  constructor(
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit(): void {
    this.groupsService.groupInfo.subscribe(response =>{
      this.groupUsers = response.userData

    })

  }

  openAddExpense(addTask: any) {
    this.modalService.open(addTask, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then(
      (result)=>{


      },
      (reason) => {

      }
    )
  }
 // TODO edit task

  openEditExpense(idTask: string, editTask: any) {
    this.modalService.open(editTask, { ariaLabelledBy: 'modal-basic-title' , size: 'lg'}).result.then(
      (result)=>{



      },
      (reason) => {


      }
    )
  }

  submitExpensesForm() {

  }
}
