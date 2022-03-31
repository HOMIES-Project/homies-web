import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { GroceriesComponent } from './groceries/groceries.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { GroupCreationComponent } from './group-creation/group-creation.component';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    TasksComponent,
    ExpensesComponent,
    GroceriesComponent,
    SidebarComponent,
    GroupCreationComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports:[GroupCreationComponent]
})
export class ComponentsModule {}
