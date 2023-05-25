import { UserService } from './user-service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credentials } from "../models/credential";
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';
import { RolService } from './rol-service';
import { stringify } from 'querystring';

@Injectable({
  providedIn:'root'
})
export class LoginService {
  isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
      isAdmin: boolean;
    constructor(private http: HttpClient,private rolService:RolService) {}

    login(creds: Credentials) {
        return this.http.post("http://localhost:8080/login", creds, {
            observe: "response"
        }).pipe(map((response: HttpResponse<any>) => {
            const body = response.body;
            const headers = response.headers;
            const bearerToken = headers.get("Authorization")!;
            const token = bearerToken.replace("Bearer ", "");
            localStorage.setItem("token", token);
            localStorage.setItem("user_current",creds.login);
            this.ifAdmin();
            this.isLoggedInSubject.next(true);
            return body;
        }))
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_current")
        this.isLoggedInSubject.next(false);
      }


      ifAdmin(){
        this.rolService.isAdmin(localStorage.getItem("user_current")).then((isUserAdmin: boolean) => {
          this.setIsAdmin(isUserAdmin);
        })
        .catch((error: any) => {
          console.error('Error al obtener el estado de administrador:', error);
        });    
      }

    getToken() {
        return localStorage.getItem("token");
    }



    getIsAdmin(): boolean {
      console.log(this.isAdmin);
      
      return this.isAdmin;
    }
  
    setIsAdmin(value: boolean): void {
      this.isAdmin = value;
    }

}
