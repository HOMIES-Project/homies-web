import { UsersService } from './services/users.service';
import { Component } from '@angular/core';
import { LoginModel } from './models/login.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'homies';

  user!: LoginModel | null;
  username!: string

  constructor(private usersService: UsersService) {
    usersService.login.subscribe(user =>{
      this.user = user;
    })
    usersService.name.subscribe(username => {
      this.username = username
    })
  }

  isLogged() {
    return this.user != null;
  }

  logout():void {
    this.usersService.performLogout();
  }
}
