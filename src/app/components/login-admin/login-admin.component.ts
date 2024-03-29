import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { Credentials } from '../../models/credential';
import { LoginService } from '../../services/login-service';
import { RolService } from '../../services/rol-service';
import { UserService } from './../../services/user-service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css'],
})
export class LoginAdminComponent {
  creds: Credentials = {
    login: '',
    password: '',
  };
  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private rolService: RolService,
    private userService: UserService,
    private router: Router
  ) {}

  login(form: NgForm) {
    this.loginService.login(this.creds).subscribe(() => {
      this.userService
        .getUserProfileByIdNavision(this.creds.login)
        .then((user: User) => {
          this.rolService.isAdmin(user.login).then((response) => {

            if (response) {
              this.userService.userActive(localStorage.getItem("user_current"),"true");
              this.router.navigate(['/admindashboard']);
            } else {
              this.errorMessage = 'Este usuario no es Administrador'
              this.loginService.logout();
            }
          });
        });
    },(err) => {
      this.errorMessage = 'Usuario o contraseña incorrectos'
    });
  }
}
