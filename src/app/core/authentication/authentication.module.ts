import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActivationComponent } from './activation/activation.component';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ActivationComponent,
    RecoverPasswordComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AuthenticationModule {}
