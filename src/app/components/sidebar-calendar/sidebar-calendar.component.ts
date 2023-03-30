import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login-service';
import { RolService } from 'src/app/services/rol-service';
import { UserService } from 'src/app/services/user-service';

@Component({
  selector: 'app-sidebar-calendar',
  templateUrl: './sidebar-calendar.component.html',
  styleUrls: ['./sidebar-calendar.component.css']
})
export class SidebarCalendarComponent implements OnInit {
  isAdmin:any
  user:User

  constructor(private loginService: LoginService,private router: Router,private rolService:RolService,private userService:UserService) { }

  async ngOnInit() {
    await this.isAdminUser();
  }

  public async isAdminUser(){
    this.user= await this.userService.getUserProfileByIdNavision(localStorage.getItem("user_current"))
    this.isAdmin= await this.rolService.isAdmin(this.user.codigo);
    console.log(this.isAdmin);

    return this.isAdmin;
  }

  navigateToProfile() {
    this.router.navigate(['/profile'])
  }

  navigateToTurns() {
    this.router.navigate(['/home'])
  }

  navigateToUsers() {
    this.router.navigate(['/users'])
  }

  navigateToAdmindashboard() {
    this.router.navigate(['/admindashboard'])
  }

  public async logout(){
    this.loginService.deleteToken();
    await this.router.navigate(['/login'])
  }


}