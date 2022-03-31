import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LandingComponent } from './landing/landing.component';
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { ExpensesComponent } from './expenses/expenses.component';
import { GroceriesComponent } from './groceries/groceries.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    LandingComponent,
    HomeComponent,
    TasksComponent,
    ExpensesComponent,
    GroceriesComponent,
    SidebarComponent,
    ProfileComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ComponentsModule {}
