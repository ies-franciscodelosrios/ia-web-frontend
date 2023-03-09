import { UserService } from './../services/user-service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HasRoleGuard implements CanActivate {

  constructor(private userService: UserService, private router: Router){}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Promise<boolean> {

    const allowedRoles = route.data?.['allowedRoles'];
    
    const user = await this.userService.getUserProfileByIdNavision(localStorage.getItem('user_current'))

    if (Boolean(user.rols.find(rol => allowedRoles.includes(rol.rolname)))) {
      return true;
    } else {
      this.router.navigate([window.history.back()])
      return false;
    }
    
  }
  
}
