import { GroupsService } from 'src/app/core/services/groups.service';
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

  isLoadingWhenLoged: boolean = false;

  idParam!: string;
  groupID!:string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private groupsService: GroupsService,
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
        this.isLoadingWhenLoged = true;
        this.usersService.getUserInfo(response.id).subscribe((response) => {
          if (response.groups.length == 0) {
            this.router.navigate(['home']);
            this.isLoadingWhenLoged = false;
          } else {
            this.groupID = response.groups[0].id
            this.router.navigate(['home']);
            this.groupsService.updateGroupId(this.groupID).subscribe()
            this.isLoadingWhenLoged = false;
          }
        });
        this.isLoading = false;
        this.errorMsg = null;
      },
      (error) => {
        this.errorMsg = 'Usuario o contraseña incorrectos';
        this.isLoading = false;
      },
    );
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }
}
