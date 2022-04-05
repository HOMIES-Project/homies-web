import { UsersService } from './core/services/users.service';
import { Component } from '@angular/core';
import { LoginModel } from './core/models/login.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'homies';

  user!: LoginModel | null;
  id!: number;
  username!: string |undefined

  constructor(private usersService: UsersService) {
    usersService.login.subscribe(user =>{
      this.user = user;
    })
    usersService.userId.subscribe(id => {
      this.id = id
    })
    usersService.user.subscribe(response =>{
      this.username = response?.user.login
    })
  }

  isLogged() {
    return this.user != null;
  }

  logout():void {
    this.usersService.performLogout();
  }
}
