import { GroupsService } from './../../core/services/groups.service';
import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  id!: number;
  username!: string;

  constructor(
    private groupsService: GroupsService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.usersService.userId.subscribe(response =>{
      this.id = response
    })
    this.usersService.getUserInfo(this.id).subscribe(response =>{

      this.username = response.user.firstName
    })
  }
}
