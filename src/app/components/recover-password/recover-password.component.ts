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
import {
  RecoveryCheckModel,
  RecoveryModel,
} from 'src/app/models/recoveryPassword.model';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['../login/login.component.css'],
})
export class RecoverPasswordComponent implements OnInit {
  emailSent: boolean = false;
  passwordSent: boolean = false;
  recoveryFormEmail: FormGroup;
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
    this.recoveryFormEmail = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
      { validators: this.mustMatchValidator }
    );
    this.recoveryForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        passConfirm: ['', Validators.required],
      },
      { validators: this.mustMatchValidator }
    );
  }

  ngOnInit(): void {}

  //TEMPORARY - TODO --> RECOVER BY EMAIL
  submitForm() {
    let passRecovery: RecoveryCheckModel = new RecoveryCheckModel(
      this.recoveryFormEmail.controls.email.value
    );
    this.emailSent = true;
    if (!this.recoveryFormEmail.valid) return;
    this.isLoading = true;

    this.usersService.checkEmailForRecovery(passRecovery).subscribe(
      (response) => {
        console.log(response.key);
        this.key = response.key;
        this.isLoading = false;
        this.errorMsg = null;
      },
      (error) => {
        console.log(error);
        this.errorMsg = `⚠ El usuario no existe `;
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
      this.recoveryForm.controls.password.value
    );
    this.passwordSent = true;
    if (!this.recoveryForm.valid) return;
    this.isLoading = true;
    console.log(recovery);
    this.usersService.performRecovery(recovery).subscribe((response) => {
      this.isLoading = false
      Swal.fire({
        title: '¡Contraseña cambiada!',
        icon: 'success',
        showCancelButton: false,
        confirmButtonColor: '#61d4ff',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        this.router.navigate(['/login']);
      })


    });
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }
}
