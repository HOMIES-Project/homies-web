import { ExpensesComponent } from './components/expenses/expenses.component';
import { GroceriesComponent } from './components/groceries/groceries.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ActivationComponent } from './components/activation/activation.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RecoverPasswordComponent } from './components/recover-password/recover-password.component';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "landing",
    pathMatch: "full"
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'activation',
    component: ActivationComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: 'recovery',
    component: RecoverPasswordComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'groceries',
    component: GroceriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'expenses',
    component: ExpensesComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
