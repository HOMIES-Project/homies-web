import {
  BalancesCreationModel,
  ExpensesCreationModel,
} from './../../../core/models/expensesCreation.model';
import { ExpenseModalComponent } from './expenses-components/expense-modal/expense-modal.component';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css'],
})
export class ExpensesComponent implements OnInit {
  active = 1;

  isEditting: boolean = true;
  isCreating: boolean = true;

  expensesarray: Array<ExpensesCreationModel> = [];
  balancesArray: Array<BalancesCreationModel> = [];

  payed!: boolean;
  noExpenses: boolean = true;

  constructor() {}

  ngOnInit(): void {

    // TO DO EXPENSES
    this.expensesarray = [
      {
        debtorUser: 'Esther',
        userCreditor: 'Jorge',
        expenseName: 'Cervezas',
        amount: 15,
      },
      {
        debtorUser: 'Álex',
        userCreditor: 'Carlos',
        expenseName: 'Galletas',
        amount: 3.5,
      },
      {
        debtorUser: 'Álex',
        userCreditor: 'Jorge',
        expenseName: 'Chuches',
        amount: 5,
      },
    ];
    this.balancesArray = [
      {
        debtorUser: 'Jorge',
        userCreditor: 'Esther',
        amount: 15,
      },
    ];
  }

  confirmPayment() {
    Swal.fire({
      title: '¿Saldar deuda?',
      text: '',
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#34ade7',
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
      cancelButtonColor: '#df4759',
    }).then((result) => {
      if (result.isConfirmed) {
        this.payed = !this.payed;
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}
