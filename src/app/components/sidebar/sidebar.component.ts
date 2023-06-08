import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login-service';
import { RolService } from 'src/app/services/rol-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  islogged:any;
  isAdmin:any
  user:User
  constructor(private loginService: LoginService,private router: Router,private rolService:RolService, private userService:UserService) {  }

  ngOnInit() {
    this.comprobarLogin();
  }

  public async logout(){
    this.userService.userActive(localStorage.getItem("user_current"),"false");
    this.loginService.logout();
    await this.router.navigate(['/login'])
  }

  public async logoutAdmin(){
    this.userService.userActive(localStorage.getItem("user_current"),"false");
    this.loginService.logout();
    await this.router.navigate(['/login/admin'])
  }

  comprobarLogin(){
    this.islogged=this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.islogged=isLoggedIn;
    });
    this.rolService.isAdmin(localStorage.getItem("user_current")).then((isUserAdmin: boolean) => {
      this.isAdmin=isUserAdmin
    })
    .catch((error: any) => {
      console.warn('Error al obtener el estado de administrador:', error);
    });
  }

}
