import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login-service';
import { RolService } from './services/rol-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{

  constructor(public login:LoginService,private rolService:RolService) {
  }

  ngOnInit(): void {

    this.rolService.isAdmin(localStorage.getItem("user_current"));

  }

  async ionViewDidEnter(){

    !this.login.isLoggedIn();

  }



  title = 'ia';
}
