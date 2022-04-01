import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username!: string
  name!: string
  surname!: string
  email!: string
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService) {
      
      this.userForm = this.formBuilder.group({
        username: ['', Validators.required],
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', Validators.required, Validators.email],
      })
    
  }

  ngOnInit(): void {
  }

}
