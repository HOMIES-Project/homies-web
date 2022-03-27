import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  langkey!: string;
  sent: boolean = false;
  errorMsg!: string | null;
  isLoading: boolean = false;
  showPassword: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router)
    {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {

  }

  submitForm() {

    let userLogin: LoginModel = new LoginModel(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value,
      "",
    );
    this.sent = true;
    if (!this.loginForm.valid)
      return;
    this.isLoading = true;
    //Llamada al back
    this.usersService
    .performLogin(userLogin)
    .subscribe( response => {
      this.isLoading = false;
      this.errorMsg = null;
      this.router.navigate(['/home'])
    }, error => {
      console.log(error)
      this.errorMsg = "Usuario o contraseña incorrectos"
      this.isLoading = false;
    },
    () => {
      this.isLoading = false;
      this.router.navigate(['/home'])
    })
  }

  logout() {
    this.usersService.performLogout()
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

}
