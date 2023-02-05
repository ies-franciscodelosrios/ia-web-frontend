import { Router } from '@angular/router';
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Credentials } from "../models/credential";
import { map } from 'rxjs/operators'

@Injectable({
  providedIn:'root'
})
export class LoginService {

    constructor(private http: HttpClient, private router: Router) {}
       
    login(creds: Credentials) {
        return this.http.post("http://localhost:8080/login", creds, {
            observe: "response"
        }).pipe(map((response: HttpResponse<any>) => {
            const body = response.body;
            const headers = response.headers;

            const bearerToken = headers.get("Authorization")!;
            const token = bearerToken.replace("Bearer ", "");

            localStorage.setItem("token", token);

            return body;
        }))
    }

    getToken() {
        return localStorage.getItem("token");
    }

    deleteToken() {
        localStorage.removeItem("token");              
    }
}