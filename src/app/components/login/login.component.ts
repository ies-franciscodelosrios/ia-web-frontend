import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../../models/credential';
import { LoginService } from '../../services/login-service';

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
    private router: Router
  ) {}

  login(form: NgForm) {
    this.loginService.login(this.creds)
      .subscribe(response => {
        this.router.navigate(["/home"])
      },(err) => {
        this.errorMessage = 'Usuario o contraseña incorrectos'
      })
  }

}
