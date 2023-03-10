import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn:'root'
})
export class RolService {

    constructor(private http: HttpClient) {}

    assignRolToUser(userId: string, rolId:number) {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('userId', userId)
      headers = headers.append('rolId', ""+rolId)
      let endpoint = environment.endpoint+environment.assignRolToUser;
      return this.http.get(endpoint,{'headers':headers}).toPromise();
    }

    denyRolToUser(userId: string, rolId:number) {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('userId', userId)
      headers = headers.append('rolId', ""+rolId)
      let endpoint = environment.endpoint+environment.denyRolToUser;
      return this.http.get(endpoint,{'headers':headers}).toPromise();
    }

    getUsersOfOneRol(rolId:number) {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('rolId', ""+rolId)
      let endpoint = environment.endpoint+environment.getUsersOfOneRol;
      return this.http.get(endpoint,{'headers':headers}).toPromise();
    }

    isAdmin(userId: string) {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('userId', userId)
      let endpoint = environment.endpoint+environment.UserIsAdmin;
      return this.http.get(endpoint,{'headers':headers}).toPromise();
    }

    isEvaluador(userId: string) {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('userId', userId)
      let endpoint = environment.endpoint+environment.UserIsEvaluador;
      return this.http.get(endpoint,{'headers':headers}).toPromise();
    }

    isSocio(userId: string) {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('userId', userId)
      let endpoint = environment.endpoint+environment.UserIsSocio;
      return this.http.get(endpoint,{'headers':headers}).toPromise();
    }
       
}