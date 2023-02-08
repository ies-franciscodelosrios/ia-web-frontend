import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { Event } from '../models/event';

@Injectable({
  providedIn:'root'
})

export class UserService {

  constructor(private http:HttpClient) { }
  //Se realizan llamadas a la api de la APP mediante la clase HttpClient, realizando peticiones GET, POST, PUT y DELETE


  /**
   * @returns Promise<Kid[]>, una lista de todos los niños de la base de datos
   */
  public async getUserByDNI(dni:string):Promise<User>{
    let endpoint=environment.endpoint+environment.getUserByDNI+dni;
    let user:any=await this.http.get(endpoint,this.header).toPromise();
    return user;
  }

  public getUserByIdNavision(idNavision:string) {
    return this.http.get(`http://localhost:8080/api/user/search/id/${idNavision}`);
  }


  public async getUserProfileByIdNavision(idNavision:string) {
    let endpoint=environment.endpoint+environment.getUserByIDNAVISION+idNavision;
    let user:any=await this.http.get(endpoint,this.header).toPromise();
    return user;
  }


  public async getUserEvents(dni:string):Promise<Event[]> {
    let endpoint=environment.endpoint+environment.getUserEvents+dni;
    let events:any=await this.http.get(endpoint,this.header).toPromise();
    return events;
  }


  public async getTeamManagerByUser(idNavision:string) {
    let endpoint=environment.endpoint+environment.getTeamManagerByUser+idNavision;
    let user:any=await this.http.get(endpoint,this.header).toPromise();
    return user;
  }

  public async getNameTeamManagerByUser(idNavision:string):Promise<String[]> {
    let endpoint=environment.endpoint+environment.getNameTeamManagerByUser+idNavision;
    let users:any=await this.http.get(endpoint,this.header).toPromise();
    return users;
  }


  public async updateUser(user:User):Promise<User> {
    let endpoint=environment.endpoint+environment.updateUser;
    return new Promise ((resolve,reject)=>{
      if(user){
        this.http.put(endpoint,user,this.header).toPromise().then(d=>{
          resolve(user);
          console.log(d);
        }).catch(err=> reject(err));
      }else{
        reject('No hay resultados')
      }
    });
  }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('PUT', `${environment.endpoint+environment.updatePhotoProfile+'49832345M'}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }



  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }


}
