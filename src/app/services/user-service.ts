import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../model/user";

@Injectable({
  providedIn:'root'
})

export class UserService {

  constructor(private http:HttpClient) { }
  //Se realizan llamadas a la api de la APP mediante la clase HttpClient, realizando peticiones GET, POST, PUT y DELETE


  /**
   * @returns Promise<Kid[]>, una lista de todos los niños de la base de datos
   */
  public async getUserByDNI(dni:String):Promise<User>{
    let endpoint=environment.endpoint+environment.getUserByDNI+dni;
    let user:any=await this.http.get(endpoint,this.header).toPromise();
    return user;
  }






  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }


}
