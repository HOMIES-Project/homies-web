import { UserChangePassword } from './../../../core/models/user-data.model';
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
import { DatePipe } from '@angular/common';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

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
  birth!: string | undefined;
  premium: boolean = false;
  userChanged!: RegisterModel;
  userDataChanged!: UserEditModel;
  showPassword: boolean = false;
  userProfileFrom: FormGroup;
  changePasswordForm: FormGroup;
  changePassword!: UserChangePassword;
  profilePicture!: File;
  profilePicturePath!: any;
  birthDate!: Date;
  photoContentType = 'image/png';
  langKey!: string;
  // birthDateTime!: NgbDate;
  currentPassword!: string;
  newPassword!: string;
  passConfirm!: string;
  sent: boolean = false;

  successfullyEdited: boolean = false;
  successfullyEditedPass: boolean = false;

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
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['',[Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      passConfirm: ['', Validators.required],
    });

    this.userProfileFrom = this.formBuilder.group({
      login: new FormControl(),
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      phone: new FormControl(),
      photo: new FormControl(),
      birthDate: new FormControl(),
      
    });
  }

  // dateToString() {
  //   this.birthDate = new Date();
  //   let latest_date = this.datePipe.transform(this.birthDate, 'yyyy-MM-dd');
  // }

  mustMatchValidator: ValidatorFn = (
    control: AbstractControl
  ): ValidationErrors | null => {
    let passVal = control.get('newPassword');
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
      this.phone = response?.phone,
      this.birthDate = response?.birthDate,
      this.photo = response?.photo;
    });
    /** ADD USER VALUES TO FORM DEFAULT VALUES  **/
    this.userProfileFrom.patchValue({
      login: this.login,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
      photo: this.photo,
      birthDate: this.birthDate
    });

    /** DECODE BASE64 PROFILE PICTURE**/
    this.base64ProfileImage = `data:image/png;base64,${this.photo}`;
  }

  showPass() {
    this.showPassword = !this.showPassword;
  }

  /* CONVERT DATE TO LOCALDATE */
  

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
    this.birthDate.toISOString;
    this.userDataChanged = new UserEditModel(
      this.userProfileFrom.controls.login.value,
      this.userProfileFrom.controls.firstName.value,
      this.userProfileFrom.controls.lastName.value,
      this.userProfileFrom.controls.email.value,
      this.langKey = navigator.language,
      this.userProfileFrom.controls.phone.value,
      // this.userProfileFrom.controls.photo.value,
      this.photo!, 
      this.photoContentType,
      this.userProfileFrom.controls.birthDate.value,
    );

      // this.birthDate.toString();

    // this.birthDate = new Date();
    //   this.birthDateTime = new NgbDate(
    //     this.birthDate.getFullYear(),
    //     this.birthDate.getMonth() + 1,
    //     this.birthDate.getDay()
    //   );

    // if(this.birthDate != null || this.phone != null) {
      
    //   console.log(this.birthDateTime);
    //   this.userProfileFrom.controls.phone.value,
    //   console.log('FECHA ' + typeof this.birthDate);
      

    //   this.birthDate = this.userProfileFrom.controls.birthDate.value;
    // } 
    

    
    
    console.log("FECHA " + typeof this.birthDate);
    console.log("FECHA NUEVA " + this.birthDate);
    //  let str = this.birthDate.toUTCString();
    //  if (str != "") {
    //    console.log("FECHA " + str);
    // } else {
      
    // }
    

    // let str = this.birthDate.toString();
    // console.log("Fecha:" + str)
    // this.birthDate = date.toDateStr
    // let str = this.birthDate.toDateString();
    // console.log(str)
    this.usersService
      .performEditUser(this.userDataChanged, this.id)
      .subscribe((response) => {
        console.log(response);
        this.successfullyEdited = true
      }, error=> {
        console.log(error)
      });
    console.log(this.photo);
    console.log(this.userDataChanged);
  }

  submitChangePassword() {
    this.changePassword = new UserChangePassword(
      this.changePasswordForm.controls.currentPassword.value,
      this.changePasswordForm.controls.newPassword.value,
    );
    this.sent = true;
    this.usersService.performChangePassword(this.changePassword).subscribe((response) => {
      console.log(response);
      this.successfullyEditedPass = true
    }, error=> {
      console.log(error)
    })
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
