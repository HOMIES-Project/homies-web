import { UsersService } from '../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/core/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  langkey!: string;
  sent: boolean = false;
  errorMsg!: string | null;
  isLoading: boolean = false;
  showPassword: boolean = false;

  idParam!: string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    let userLogin: LoginModel = new LoginModel(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value,
      ''
    );
    this.sent = true;
    if (!this.loginForm.valid) return;
    this.isLoading = true;
    //Llamada al back
    this.usersService.performLogin(userLogin).subscribe(
      (response) => {
        console.log(response.id);
        this.usersService.getUserInfo(response.id).subscribe((response) => {
          console.log(response);
          if (response.groups.length == 0) {
            this.router.navigate(['home']);
          } else {
            let id = response.groups[0].id
            this.router.navigate(['home', id]);
          }
        });
        this.isLoading = false;
        this.errorMsg = null;
      },
      (error) => {
        console.log(error);
        this.errorMsg = 'Usuario o contraseña incorrectos';
        this.isLoading = false;
      },
    );
  }

  logout() {
    this.usersService.performLogout();
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }
}
