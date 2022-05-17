import { UsersService } from 'src/app/core/services/users.service';
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
} from 'src/app/core/models/recoveryPassword.model';
import { ActivatedRoute, Router } from '@angular/router';
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
  public sub: any;

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
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.recoveryFormEmail = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
      },
    );
    this.recoveryForm = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        passConfirm: ['', Validators.required],
      },
      { validators: this.mustMatchValidator }
    );
  }

  ngOnInit(): void {
    this.getKeyToResetPassword()
  }

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
        this.isLoading = false;
        this.errorMsg = null;
        Swal.fire({
          text: `Te hemos enviado un correo para cambiar la contraseña`,
          icon: 'info',
          showCancelButton: false,
          confirmButtonColor: '#61d4ff',
          confirmButtonText: 'OK'
        }).then((result) => {
          this.router.navigate(['/landing']);
        })
      },
      (error) => {
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }
  getKeyToResetPassword() {
    this.sub = this.route.queryParams.subscribe((params) => {
      this.key = params.key;
    });
  }
  submitForm1() {
    let recovery = new RecoveryModel(
      this.key,
      this.recoveryForm.controls.password.value
    );
    this.passwordSent = true;
    if (!this.recoveryForm.valid) return;
    this.isLoading = true;

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
    },
    error => {
    });
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }
}
