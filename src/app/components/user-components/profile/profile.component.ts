import { UserData, UserEditModel } from '../../../core/models/user-data.model';
import { RegisterModel } from '../../../core/models/register.model';
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
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id!: string;
  login!: string | undefined;
  firstName!: string | undefined;
  lastName!: string | undefined;
  email!: string | undefined;
  phone!: string | undefined;
  photo!: string | undefined;
  birthDate!: Date | undefined;
  premium: boolean = false;
  langKey!: string;
  photoContentType: string = 'image/png';

  userDataChanged!: UserEditModel;
  showPassword: boolean = false;
  userForm: FormGroup;
  profilePicture!: File;
  profilePicturePath!: any;

  base64Output!: string;
  base64Image: any;
  base64ProfileImage!: string;

  imagePath!: any;
  url!: any;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {
    this.userForm = this.formBuilder.group({
      login: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      birthDate: new FormControl(),
      photo: new FormControl(),
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
      this.login = response?.user.login;
      this.email = response?.user.email;
      this.firstName = response?.user.firstName;
      this.lastName = response?.user.lastName;
      (this.phone = response?.phone),
        (this.photo = response?.photo);
    });
    /** ADD USER VALUES TO FORM DEFAULT VALUES  **/
    this.userForm.patchValue({
      login: this.login,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    });

    /** DECODE BASE64 PROFILE PICTURE**/
    this.base64ProfileImage = `data:image/png;base64,${this.photo}`;
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

  /** SUBMIT CHANGES IN USER PROFILE **/
  submitChangeProfileForm() {
    this.userDataChanged = new UserEditModel(
      this.userForm.controls.login.value,
      this.userForm.controls.firstName.value,
      this.userForm.controls.lastName.value,
      this.userForm.controls.email.value,
      (this.langKey = navigator.language),
      this.userForm.controls.phone.value,
      this.photo!,
      this.photoContentType,
      this.userForm.controls.birthDate.value
    );
      this.birthDate = this.userForm.controls.birthDate.value
    this.usersService.performEditUser(this.userDataChanged, this.id).subscribe(response => {
      console.log(response)
    })
    console.log(typeof this.birthDate)
    console.log(this.userDataChanged);
  }

  /** PROFILE PICTURE **/
  profilePictureImageDecoded() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(
      this.base64ProfileImage
    );
  }

  getProfilePicture(event: any): any {
    this.convertFile(event.target.files[0]).subscribe((base64) => {
      this.photo = base64;
      this.base64ProfileImage = `data:image/png;base64,${this.photo}`;
      console.log(this.photo);
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

  /** DELETE USER **/

  deleteUser() {
    Swal.fire({
      title: '¡Cuidado! Vas a eliminar tu usuario',
      text: 'Perderás todos tus datos y no podrás recuperarlos',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34ade7',
      confirmButtonText: 'Confirmar',
      cancelButtonText: `Cancelar`,
      cancelButtonColor: '#df4759',
    }).then((result) => {
      if (result.isConfirmed) {
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
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  }
}





