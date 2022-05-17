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
import { Component, Injectable, OnInit, LOCALE_ID, Inject } from '@angular/core';
import Swal from 'sweetalert2';
import { Observable, ReplaySubject } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { formatDate } from '@angular/common';

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
  birth!: string;
  premium: boolean = false;
  userChanged!: RegisterModel;
  userDataChanged!: UserEditModel;
  showPassword: boolean = false;
  userProfileFrom: FormGroup;
  profilePicture!: File;
  profilePicturePath!: any;
  birthDate!: string;
  photoContentType = 'image/png';
  langKey!: string;

  changePasswordForm: FormGroup;
  changePassword!: UserChangePassword;
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
    private sanitizer: DomSanitizer,
    @Inject(LOCALE_ID) public locale: string
  ) {
    this.changePasswordForm = this.formBuilder.group({
      currentPassword: ['',[Validators.required, Validators.minLength(8)]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      passConfirm: ['', Validators.required],
    },
    { validators: this.mustMatchValidator }
    );

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
      // photo: this.photo,
      birthDate: this.birthDate
    });

    /** DECODE BASE64 PROFILE PICTURE**/
    this.base64ProfileImage = `data:image/png;base64,${this.photo}`;
  }

  showPass() {
    this.showPassword = !this.showPassword;
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
    });
  }

  /* DELETE PHOTO PROFILE */
  removePhoto() {
    this.photoContentType = "";
    this.photo = "";
    console.log(this.photo);
  }

  /* CONVERT DATE TO FORMATDATE */
  convertDate() {
    if(this.birthDate == "") {
      this.birthDate = formatDate(this.birthDate, 'yyyy-dd-MM', this.locale);
      console.log("FECHA " + this.birthDate);
      console.log("FECHA DE TIPO " + typeof this.birthDate);
    }
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
    this.convertDate();

    this.userDataChanged = new UserEditModel(
      this.userProfileFrom.controls.login.value,
      this.userProfileFrom.controls.firstName.value,
      this.userProfileFrom.controls.lastName.value,
      this.userProfileFrom.controls.email.value,
      this.langKey = navigator.language,
      this.userProfileFrom.controls.phone.value,
      this.photo!, 
      this.photoContentType,
      this.userProfileFrom.controls.birthDate.value,
    );    

    /* CHECK EMAIL WHEN IS CHANGED */
    if(this.userProfileFrom.controls.email.value != this.email) {
      console.log("SE HA CAMBIADO EL EMAIL");
      console.log("EMAIL ANTIGUO " + this.email)
      console.log("EMAIL NUEVO " + this.userProfileFrom.controls.email.value)
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger',
        },
        buttonsStyling: true
      })
      
      swalWithBootstrapButtons.fire({
        title: 'HAS CAMBIADO EL EMAIL',
        text: "¿Estás seguro de que quieres cambiarlo de " + this.email + " a " + this.userProfileFrom.controls.email.value + "?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'CAMBIAR',
        confirmButtonColor: '#34ade7',
        cancelButtonText: 'CANCELAR',
        cancelButtonColor: '#df4759',
        reverseButtons: true
      }).then(async (result) => {
        if (result.isConfirmed) {
          const { value: emailConfirm } = await Swal.fire({
            title: 'Vuelve a poner el correo nuevo',
            icon: 'info',
            input: 'email',
            inputLabel: 'Nuevo correo introducido: ' + this.userProfileFrom.controls.email.value,
            inputPlaceholder: 'Correo nuevo'
          })
          
          if (emailConfirm == this.userProfileFrom.controls.email.value) {
            swalWithBootstrapButtons.fire(
              '¡CAMBIADO!',
              'Tu email se ha cambiado a ' + this.userProfileFrom.controls.email.value + ', verifica tu correo.',
              'success'
            )
            this.usersService
            .performEditUser(this.userDataChanged, this.id)
            .subscribe((response) => {
              console.log(response);
              this.successfullyEdited = true
            }, error=> {
              console.log(error)
            });
            console.log(this.userDataChanged);
            this.usersService.performLogout();
          } else if(emailConfirm != this.userProfileFrom.controls.email.value){
            Swal.fire({
              title: 'No coincide el correo, vuelve a ponerlo',
              icon: 'error',
              input: 'email',
              inputLabel: 'Nuevo correo introducido: ' + this.userProfileFrom.controls.email.value,
              inputPlaceholder: 'Correo nuevo'
            })
          }
          
        } else if (
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'CANCELADO',
            'Tu correo sigue siendo ' + this.email,
            'error'
          )
        }
      })
      
    } else {
      this.usersService
      .performEditUser(this.userDataChanged, this.id)
      .subscribe((response) => {
        // console.log(response);
        this.successfullyEdited = true
      }, error=> {
        console.log(error)
      });
    // console.log(this.photo);
    console.log(this.userDataChanged);
    }
  }

  /* SUBMIT CHANGE PASSWORD */
  submitChangePassword() {
    this.changePassword = new UserChangePassword(
      this.changePasswordForm.controls.currentPassword.value,
      this.changePasswordForm.controls.newPassword.value,
    );
    this.sent = true;
    this.usersService
      .performChangePassword(this.changePassword)
      .subscribe((response) => {
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
