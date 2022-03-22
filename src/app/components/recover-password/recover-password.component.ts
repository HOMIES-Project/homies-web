import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoveryModel } from 'src/app/models/recoveryPassword.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RecoverPasswordComponent implements OnInit {
  
  sent: boolean = false;
  recoveryForm: FormGroup;
  errorMsg!: string | null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router) 
    {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    })

   }

  ngOnInit(): void {
  }

  submitForm(){

    let passRecovery: RecoveryModel = new RecoveryModel(
      this.recoveryForm.controls.email.value,
    );
    this.sent = true
    if (!this.recoveryForm.valid)
      return;
    this.isLoading = true;
    
    this.usersService.performRecovery(passRecovery).subscribe(response => {
      this.isLoading = false;
      this.errorMsg = null;
      this.router.navigate(['/login'])
    }, error =>{
      this.errorMsg = `⚠ El usuario no existe (${error.error?.error})`
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
      this.router.navigate(['/landing'])
    })
  }

}
