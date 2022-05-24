import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterModel } from '../../models/register.model';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  langKey!: string;
  sent: boolean = false;
  errorMsg!: string | null;
  isLoading: boolean = false;
  showPassword: boolean = false;
  loginErrorEN!: string;
  mailErrorEN!: string;
  id!: string;
  activated!: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.langKey = navigator.language;
  }

  mustMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let passVal = control.get('password');
    let passConfirmVal = control.get('passConfirm');

    return passVal?.value === passConfirmVal?.value ? null : { noMatch: true };
  };

  registerForm = this.formBuilder.group(
    {
      login: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      passConfirm: ['', Validators.required],
    },
    { validators: this.mustMatchValidator }
  );

  submitRegister() {
    let userRegister: RegisterModel = new RegisterModel(
      this.id,
      this.registerForm.controls.login.value,
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.langKey,
      this.activated
    );
    this.sent = true;

    if (!this.registerForm.valid) {
      return;
    }
    this.isLoading = true;

    this.usersService.performRegister(userRegister).subscribe(
      (response) => {
        this.isLoading = false;
        this.errorMsg = null;
        Swal.fire({
          title: '¡Usuario registrado correctamente!',
          text: 'Comprueba tu correo para activar la cuenta',
          icon: 'success',
          showCancelButton: false,
          confirmButtonColor: '#61d4ff',
          confirmButtonText: 'Confirmar',
        }).then((result) => {
          this.router.navigate(['/login']);
        });
      },
      (error) => {
        this.loginErrorEN = error.error.title;
        if (this.loginErrorEN.includes('login')) {
          if (this.langKey.includes('en')) {
            this.errorMsg = error.error.title;
          } else {
            this.errorMsg = 'El nombre de usuario ya existe';
          }
        } else {
          if (this.langKey.includes('en')) {
            this.errorMsg = error.error.title;
          } else {
            this.errorMsg = 'El email ya existe';
          }
        }

        /*
        this.errorMsg = `⚠ Fallo en el registro
        (${error.error.title})`; */
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }
}
