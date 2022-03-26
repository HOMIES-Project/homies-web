import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { HomeComponent } from './home/home.component';
import { ActivationComponent } from './activation/activation.component';
import { SidebarComponent } from './sidebar/sidebar.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LandingComponent,
    RecoverPasswordComponent,
    HomeComponent,
    ActivationComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class ComponentsModule { }
