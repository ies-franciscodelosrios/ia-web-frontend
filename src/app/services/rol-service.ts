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
      /*headers = headers.append('rolId', ""+rolId)
      headers = headers.append('userId', userId)*/
      let endpoint = environment.endpoint+environment.assignRolToUser+userId+"/"+rolId;
      return this.http.post(endpoint,{'headers':headers}).toPromise();
    }

    denyRolToUser(userId: string, rolId:number) {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      /*headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('userId', userId)
      headers = headers.append('rolId', ""+rolId)*/
      let endpoint = environment.endpoint+environment.denyRolToUser+userId+"/"+rolId;
      return this.http.delete(endpoint,{'headers':headers}).toPromise();
    }

    getUsersOfOneRol(rolId:number) {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('rolId', ""+rolId)
      let endpoint = environment.endpoint+environment.getUsersOfOneRol;
      return this.http.get(endpoint,{'headers':headers}).toPromise();
    }

    isAdmin(userId: string) : Promise<boolean> {
      let headers = new HttpHeaders()
      headers = headers.append('content-type','application/json')
      headers = headers.append('Access-Control-Allow-Origin', '*')
      headers = headers.append('userId', userId)
      let endpoint = environment.endpoint+environment.UserIsAdmin;
      return new Promise<boolean>((resolve, reject) => {
        this.http.get(endpoint, { headers: headers })
          .toPromise()
          .then((response: boolean) => {
            resolve(response);
          })
          .catch((error: any) => {
            reject(error);
          });
      });
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