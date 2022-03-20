import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LandingComponent } from './landing/landing.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule

  ]
})
export class ComponentsModule { }
