import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginModel } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  sent: boolean = false;
  errorMsg!: string | null;
  isLoading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router)
    {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
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
    }

}
