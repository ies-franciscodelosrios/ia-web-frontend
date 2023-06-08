import { Observable } from 'rxjs';
import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { User } from "../models/user";
import { Events } from '../models/event';

@Injectable({
  providedIn:'root'
})

export class UserService {

  constructor(private http:HttpClient) { }
  //Se realizan llamadas a la api de la APP mediante la clase HttpClient, realizando peticiones GET, POST, PUT y DELETE



  public async getUserProfileByIdNavision(idNavision:string):Promise<User>{
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('idnavision', idNavision);
    let endpoint=environment.endpoint+environment.getUserByIDNAVISION;
    let user2:any=await this.http.get(endpoint,{'headers':headers}).toPromise();

    return user2;
  }


  public async getAllUsers():Promise<User[]> {
    let endpoint=environment.endpoint+environment.getAllUsers;
    let users:any=await this.http.get(endpoint,this.header).toPromise();
    return users;
  }

  /**
   * @returns Promise<User[]>, una lista de todos los usarios de la base de datos
   */
  public async getUserByDNI(dni:string):Promise<User>{
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('codigo', dni)
    let endpoint=environment.endpoint+environment.getUserByDNI;
    let user:any=await this.http.get(endpoint,{'headers':headers}).toPromise();
    return user;
  }



  public async getUserEvents(dni:string):Promise<Events[]> {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('userId', dni);
    let endpoint=environment.endpoint+environment.getUserEvents;
    let events:any=await this.http.get(endpoint,{'headers':headers}).toPromise();
    return events;
  }



  public async getNameTeamManagerByUser(idNavision:string):Promise<string[]> {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('idnavision', idNavision)
    let endpoint=environment.endpoint+environment.getNameTeamManagerByUser;
    let users:any=await this.http.get(endpoint,{'headers':headers}).toPromise();
    return users;
  }


  public async updateUser(user:User):Promise<User> {
    let endpoint=environment.endpoint+environment.user;
    return new Promise ((resolve,reject)=>{
      if(user){
        this.http.put(endpoint,user,this.header).toPromise().then(d=>{
          resolve(user);
        }).catch(err=> reject(err));
      }else{
        reject('No hay resultados')
      }
    });
  }


  public async createUser(user:User):Promise<User> {
    let endpoint=environment.endpoint+environment.user;
    return new Promise ((resolve,reject)=>{
      if(user){
        this.http.post(endpoint,user,this.header).toPromise().then(d=>{
          resolve(user);
          console.log(user);
        }).catch(err=> reject(err));
      }else{
        reject('No hay resultados')
      }
    });
  }


   /**
   *
   * @param kid:Kid
   * @returns Promise<Kid>, un DELETE del niño pasado por parametro (con sus respectivos datos)
   */

   public deleteKid(codigo:string):Promise<User>{
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('codigo', codigo)
    const endpoint = environment.endpoint+environment.user;
    let user:any = this.http.delete(endpoint,{'headers':headers}).toPromise()
    return user;

  }


  upload(file: File,idNavision:string): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('PUT', `${environment.endpoint+environment.updatePhotoProfile+idNavision}`, formData, {
      reportProgress: true
    });
        return this.http.request(req);


  }

  getAllUsersRelations() {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    const endpoint = environment.endpoint+environment.getAllUsersRelations;
    let userRelations:any = this.http.get(endpoint,{'headers':headers}).toPromise()
    return userRelations;
  }

  createUserRelation(userRelation) {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    const endpoint = environment.endpoint+environment.createUserRelation;
    let userRelations:any = this.http.post(endpoint,userRelation,{'headers':headers}).toPromise()
    return userRelations;
  }

  public async userActive(idNavision:string, active:string):Promise<any>{
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('idnavision', idNavision)
    headers=headers.append('active', active)
    let endpoint=environment.endpoint+environment.setUserActive;
    let res:any=await this.http.put(endpoint,{},{'headers':headers}).toPromise();
    return res;
  }

  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }
}
