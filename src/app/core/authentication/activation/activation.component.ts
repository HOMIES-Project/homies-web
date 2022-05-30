import { UsersService } from 'src/app/core/services/users.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-activation',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.css'],
})
export class ActivationComponent implements OnInit {
  public sub: any;

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getKeyToActivate();
  }

  getKeyToActivate() {
    this.sub = this.route.queryParams.subscribe((params) => {
      let key = params.key;
      this.usersService.performActivation(key).subscribe(
        (response) => {
          Swal.fire({
            title: `¡Usuario activado!`,
            text: "Logueate en tu cuenta",
            icon: 'success',
            showCancelButton: false,
            confirmButtonColor: '#61d4ff',
            confirmButtonText: 'Confirmar'
          }).then((result) => {
            this.router.navigate(['/login']);
          })
        },
        (error) => {
        }
      );
    });
  }
}
