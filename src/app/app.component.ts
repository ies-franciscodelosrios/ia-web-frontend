import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login-service';
import { RolService } from './services/rol-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  isLoggedIn = false;

  constructor(public login:LoginService) {}

  ngOnInit(): void {

   
   

  }

  
  title = 'ia';
}
