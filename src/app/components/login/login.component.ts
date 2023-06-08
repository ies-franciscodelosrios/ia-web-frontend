import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../../models/credential';
import { LoginService } from '../../services/login-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  creds: Credentials = {
    login: "",
    password: ""
  };

  errorMessage: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService
  ) {}

  login(form: NgForm) {
    this.loginService.login(this.creds)
      .subscribe(response => {
        this.userService.userActive(localStorage.getItem("user_current"),"true");
        this.router.navigate(["/profile"])
      },(err) => {
        this.errorMessage = 'Usuario o contraseña incorrectos'
      })
  }

}
