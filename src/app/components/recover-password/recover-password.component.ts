import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RecoveryCheckModel, RecoveryModel } from 'src/app/models/recoveryPassword.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RecoverPasswordComponent implements OnInit {
  sent: boolean = false;
  recoveryForm: FormGroup;
  errorMsg!: string | null;
  isLoading: boolean = false;
  showPassword: boolean = false;
  key!: string;

  mustMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let passVal = control.get('password');
    let passConfirmVal = control.get('passConfirm');

    return passVal?.value === passConfirmVal?.value ? null : { noMatch: true };
  };

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.recoveryForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        passConfirm: ['', Validators.required],
      },
      { validators: this.mustMatchValidator }
    );
  }

  ngOnInit(): void {}

  submitForm() {
    let passRecovery: RecoveryCheckModel = new RecoveryCheckModel(
      this.recoveryForm.controls.email.value,
    );
    this.sent = true;
    if (!this.recoveryForm.valid) return;
    this.isLoading = true;

    this.usersService.checkEmailForRecovery(passRecovery).subscribe(
      (response) => {
        console.log(response.key);
        this.key = response.key


        this.isLoading = false;
        this.errorMsg = null;
      },
      (error) => {
        console.log(error);
        this.errorMsg = `⚠ El usuario no existe (${error.error?.error})`;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        // this.router.navigate(['/landing']);
      }
    );
  }
  submitForm1() {
    let recovery = new RecoveryModel(
      this.key,
      this.recoveryForm.controls.password.value,

    );
    console.log(recovery)
    this.usersService.performRecovery(recovery).subscribe(
      response =>{
        console.log(response)
      }
    )
  }



  showPass() {
    this.showPassword = !this.showPassword;
  }
}
