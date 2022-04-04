import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  id!: number;
  username!: string;
  name!: string;
  surname!: string;
  email!: string;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private router: Router
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
    });
  }

  ngOnInit(): void {
    this.usersService.userId.subscribe((response) => {
      this.id = response;
    });
  }

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
          this.usersService.performLogout()
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
