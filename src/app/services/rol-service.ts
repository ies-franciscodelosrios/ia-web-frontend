import { Observable } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn:'root'
})
export class RolService {

    constructor(private http: HttpClient) {}

    isAdmin(userId: string) {
        return this.http.get(`http://localhost:8080/api/rol/UserIsAdmin/${userId}`);
    }
       
}