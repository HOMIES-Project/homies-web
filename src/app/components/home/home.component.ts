import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  username!: string

  constructor(private usersService: UsersService) {
    this.usersService.name.subscribe( response => {
      this.username = response
    })
  }

  ngOnInit(): void {}
}
