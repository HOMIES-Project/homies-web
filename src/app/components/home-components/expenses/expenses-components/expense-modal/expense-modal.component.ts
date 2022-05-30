import { ExpensesCreationModel } from './../../../../../core/models/expensesCreation.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GroupsService } from 'src/app/core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-expense-modal',
  templateUrl: './expense-modal.component.html',
  styleUrls: ['./expense-modal.component.css'],
})
export class ExpenseModalComponent implements OnInit {
  @Input() isEditting!: boolean;
  @Input() isCreating!: boolean;
  @Input() expenseFromChild!: any;

  groupUsers!: Array<any>;
  newExpenseForm!: FormGroup;

  constructor(
    private modalService: NgbModal,
    private groupsService: GroupsService,
    private usersService: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.newExpenseForm = this.formBuilder.group({
      expenseName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      amount: ['', [Validators.required]],
      payer: [null, Validators.required],
      debtors: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.groupsService.groupInfo.subscribe((response) => {
      this.groupUsers = response.userData;
    });
  }

  openAddExpense(expense: any) {
    this.modalService
      .open(expense, { ariaLabelledBy: 'modal-basic-title', size: 'lg' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  //TO DO SERVICE
  submitExpensesForm() {
    let expense = new ExpensesCreationModel('Esther', 'Yorch', 'Pipas', 2);
    this.expenseFromChild.push(expense);
    this.modalService.dismissAll();
  }
}
