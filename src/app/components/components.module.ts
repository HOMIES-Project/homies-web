import { AppRoutingModule } from './../app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TasksComponent } from './home-components/tasks/tasks.component';
import { ExpensesComponent } from './home-components/expenses/expenses.component';
import { GroceriesComponent } from './home-components/groceries/groceries.component';
import { ProfileComponent } from './user-components/profile/profile.component';
import { GroupCreationComponent } from './user-components/group-creation/group-creation.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserAddGroupComponent } from './user-components/user-add-group/user-add-group.component';

import { TaskModalComponent } from './home-components/tasks/tasks-components/task-modal/task-modal.component';

@NgModule({
  declarations: [
    TasksComponent,
    ExpensesComponent,
    GroceriesComponent,
    ProfileComponent,
    GroupCreationComponent,
    UserAddGroupComponent,
    TaskModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
  ],
  exports: [GroupCreationComponent, UserAddGroupComponent],
})
export class ComponentsModule {}
