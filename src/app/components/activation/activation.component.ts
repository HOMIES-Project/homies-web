import { UsersService } from 'src/app/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css']
})
export class ActivationComponent implements OnInit {

  public sub: any;

  constructor(private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.getKey()
  }

  getKey() {
  this.sub = this.route.paramMap.subscribe((params: ParamMap) =>{
      let key = params.get('key');
      this.usersService.performActivation(key).subscribe(
        response =>{
          console.log("key OK")
          this.router.navigate(['/login'])
        },
        error =>{
          console.log("error")
        }
      )
  })

  }
}
