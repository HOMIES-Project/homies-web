import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  loginForm: FormGroup;
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
      password: ['', [Validators.required, Validators.minLength(8)]],
    })
  }

  ngOnInit(): void {

  }

  submitForm() {
    let userLogin: LoginModel = new LoginModel(
      this.loginForm.controls.username.value,
      this.loginForm.controls.password.value,
      ""
    );
    this.sent = true;
    if (!this.loginForm.valid)
      return;
    this.isLoading = true;
    //Llamada al back
    this.usersService
    .performLogin(userLogin)
    .subscribe( response => {
      console.log(JSON.stringify(response));
      this.isLoading = false;
      this.errorMsg = null;
      this.router.navigate(['/home'])
    }, error => {
      this.errorMsg = `⚠ El usuario no existe (${error.error?.error})`
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
