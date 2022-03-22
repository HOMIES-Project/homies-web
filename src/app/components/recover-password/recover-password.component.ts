import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { RecoveryModel } from 'src/app/models/recoveryPassword.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['../login/login.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  langKey!: string;
  sent: boolean = false;
  recoveryForm: FormGroup;
  errorMsg!: string | null;
  isLoading: boolean = false;
  showPassword: boolean = false;

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
    private router: Router)
    {
    this.recoveryForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passConfirm: ['', Validators.required]
    }, { validators: this.mustMatchValidator }
    )

   }

  ngOnInit(): void {
    this.langKey = navigator.language;
    console.log(this.langKey);
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
      console.log(response)
      this.isLoading = false;
      this.errorMsg = null;
      this.router.navigate(['/login'])
    }, error =>{
      console.log(error)
      this.errorMsg = `⚠ El usuario no existe (${error.error?.error})`
      if (this.langKey.includes("en")) {
        this.errorMsg = error.error.title
      } else {
        this.errorMsg = "El email ya existe"
      }
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
      this.router.navigate(['/landing'])
    })
  }
  showPass() {
    this.showPassword = !this.showPassword;
  }

}


