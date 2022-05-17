import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './home-components/tasks/tasks.component';
import { ExpensesComponent } from './home-components/expenses/expenses.component';
import { GroceriesComponent } from './home-components/groceries/groceries.component';
import { ProfileComponent } from './user-components/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAddGroupComponent } from './user-components/user-add-group/user-add-group.component';

import { TaskModalComponent } from './home-components/tasks/tasks-components/task-modal/task-modal.component';
import { ExpenseModalComponent } from './home-components/expenses/expenses-components/expense-modal/expense-modal.component';

import { GroceriesModalComponent } from './home-components/groceries/groceries-modal/groceries-modal.component';

import { GroupModalComponent } from './user-components/group-modal/group-modal.component';


@NgModule({
  declarations: [
    TasksComponent,
    ExpensesComponent,
    GroceriesComponent,
    ProfileComponent,
    UserAddGroupComponent,
    TaskModalComponent,
    ExpenseModalComponent,

    GroceriesModalComponent,

    GroupModalComponent,

  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [GroupModalComponent, UserAddGroupComponent],
})
export class ComponentsModule {}
