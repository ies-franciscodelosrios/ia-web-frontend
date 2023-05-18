import { UserService } from './user-service';
import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credentials } from "../models/credential";
import { map } from 'rxjs/operators'
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn:'root'
})
export class LoginService {
    private loggedIn = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient, private router: Router) {}

    login(creds: Credentials) {
        return this.http.post("http://localhost:8080/login", creds, {
            observe: "response"
        }).pipe(map((response: HttpResponse<any>) => {
            const body = response.body;

            const headers = response.headers;

            const bearerToken = headers.get("Authorization")!;
            const token = bearerToken.replace("Bearer ", "");
            this.isLoggedIn();
            localStorage.setItem("token", token);
            localStorage.setItem("user_current",creds.login);
            this.loggedIn.next(true);
            return body;
        }))
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("user_current")
        this.loggedIn.next(false);
      }


    isLoggedIn(): Observable<boolean> {
        return this.loggedIn.asObservable();
      }

    getToken() {
        return localStorage.getItem("token");
    }

}
