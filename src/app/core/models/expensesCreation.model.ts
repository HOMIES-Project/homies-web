export class ExpensesCreationModel {
  public debtorUser: string;
  public userCreditor: string;
  public expenseName: string;
  public amount: number;

  constructor(debtorUser: string, userCreditor: string, expenseName: string, amount: number) {
    this.debtorUser= debtorUser;
    this.userCreditor = userCreditor
    this.expenseName = expenseName
    this.amount = amount
  }
}

export class BalancesCreationModel {
  public debtorUser: string;
  public userCreditor: string;
  public amount: number;

  constructor(debtorUser: string, userCreditor: string, amount: number) {
    this.debtorUser= debtorUser;
    this.userCreditor = userCreditor
    this.amount = amount
  }

}

