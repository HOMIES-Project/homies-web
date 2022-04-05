import { UserData } from './../../core/models/user-data.model';
import { RegisterModel } from './../../core/models/register.model';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id!: string;
  login!: string | undefined;
  name!: string | undefined;
  surname!: string | undefined;
  email!: string | undefined;
  phone!: string | undefined;
  birth!: Date;
  premium: boolean = false;
  userChanged!: RegisterModel;
  userDataChanged!: UserData;
  showPassword: boolean = false;
  userForm: FormGroup;
  profilePicture!: File;

  base64Output!: string;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      login: new FormControl(),
      name: new FormControl(),
      surname: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      birth: new FormControl(),
      password: ['', [Validators.required, Validators.minLength(8)]],
      passConfirm: ['', Validators.required],
    });
  }

  mustMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let passVal = control.get('password');
    let passConfirmVal = control.get('passConfirm');

    return passVal?.value === passConfirmVal?.value ? null : { noMatch: true };
  };

  ngOnInit(): void {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
    this.usersService.user.subscribe((response) => {
      this.login = response?.login;
      this.email = response?.email;
      this.name = response?.firstName;
      this.surname = response?.lastName;
    });
    this.userForm.patchValue({
      login: this.login,
      name: this.name,
      surname: this.surname,
      email: this.email,
    });
    this.userForm.controls.login.disable();
    this.userForm.controls.email.disable();
    console.log(this.login);
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

  /** PROFILE PICTURE **/

  getFile(event: any): any {
    this.convertFile(event.target.files[0]).subscribe((base64) => {
      this.base64Output = base64;
      console.log(this.base64Output);
    });
  }

  convertFile(file: File): Observable<string> {
    const result: ReplaySubject<string> | null = new ReplaySubject<string>(1);
    const reader: FileReader | null = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = (event) => {
      if (event != null) {
        result.next(btoa(event.target!.result!.toString()));
      }
    };

    return result;
  }

  /** SUBMIT CHANGES IN USER PROFILE **/

  submitChangeProfileForm() {
    this.userChanged = new RegisterModel(
      this.id,
      this.userForm.controls.login.value,
      this.userForm.controls.email.value,
      this.userForm.controls.password.value,
      this.userForm.controls.name.value,
      this.userForm.controls.surname.value,
      '',
      true
    );
    this.userDataChanged = new UserData(
      this.id,
      '',
      this.userForm.controls.phone.value,
      this.premium,
      this.birth,
      this.userChanged
    );
    console.log(this.userDataChanged);
  }

  /** DELETE USER **/

  deleteUser() {
    Swal.fire({
      title: '¡Cuidado! Vas a eliminar tu usuario',
      text: 'Perderás todos tus datos y no podrás recuperarlos',
      icon: 'warning',
      showCancelButton: false,
      confirmButtonColor: '#61d4ff',
      confirmButtonText: 'Confirmar',
    }).then((result) => {
      this.usersService.performDeleteUser(this.id).subscribe(
        (response) => {
          this.usersService.performLogout();
          console.log(response);
          this.router.navigate(['/landing']);
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
