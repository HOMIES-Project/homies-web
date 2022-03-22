import { UsersService } from './../../services/users.service';
import { RegisterModel } from './../../models/register.model';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usersService: UsersService
  ) {}
  ngOnInit(): void {
    this.langKey = navigator.language
    console.log(this.langKey)
  }

  mustMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let passVal = control.get('password');
    let passConfirmVal = control.get('passConfirm');

    return passVal?.value === passConfirmVal?.value ? null : { noMatch: true };
  };

  registerForm = this.formBuilder.group({
    login: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    passConfirm: ['', Validators.required],
  },  { validators: this.mustMatchValidator });



  submitRegister() {
    let userRegister: RegisterModel = new RegisterModel(
      this.registerForm.controls.login.value,
      this.registerForm.controls.email.value,
      this.registerForm.controls.password.value,
      this.registerForm.controls.firstName.value,
      this.registerForm.controls.lastName.value,
      this.langKey
    );
    this.sent = true

    if(!this.registerForm.valid){
      return;
    }
    this.isLoading = true;

    this.usersService.performRegister(userRegister).subscribe(
      (response) => {
        console.log(JSON.stringify(response));
        this.isLoading = false;
        this.errorMsg = null;
        this.router.navigate(['/login']);
      },
      (error) => {
        this.errorMsg = `⚠ Fallo en el registro (${error.error?.error})`;
        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      }
    );
    console.log(userRegister);
  }


  showPass() {
    this.showPassword = !this.showPassword;
  }
}
