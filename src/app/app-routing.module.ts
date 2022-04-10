import { ProfileComponent } from './components/user-components/profile/profile.component';
import { ExpensesComponent } from './components/home-components/expenses/expenses.component';
import { GroceriesComponent } from './components/home-components/groceries/groceries.component';
import { TasksComponent } from './components/home-components/tasks/tasks.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { ActivationComponent } from './core/authentication/activation/activation.component';
import { RegisterComponent } from './core/authentication/register/register.component';
import { RecoverPasswordComponent } from './core/authentication/recover-password/recover-password.component';


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
    component: HomeComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    children:[
      {path:':id', component: HomeComponent},
      {path:'tasks/:id', component: TasksComponent},
      {path:'expenses/:id', component: ExpensesComponent},
      {path:'groceries/:id', component: GroceriesComponent}
    ]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
