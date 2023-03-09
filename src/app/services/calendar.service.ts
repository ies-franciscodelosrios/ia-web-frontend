import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private baseUrl = "http://localhost:8080/api/event/";

  constructor(private http: HttpClient) { }

  public getEvents(): Promise<Event[]>{
   return this.http.get<Event[]>(`${this.baseUrl}`).toPromise();
  }

  public getEventsByUser(codigo:string): Observable<Event[]>{
    return this.http.get<Event[]>(`http://localhost:8080/api/event/user/${codigo}`);
  }





  public async createEvent(user:Event, codigo:string):Promise<Event> {
    let baseuserevent = "http://localhost:8080/api/event/save/assignUser/"+codigo;
    return new Promise ((resolve,reject)=>{
      if(user){
        this.http.post(baseuserevent,user,this.header).toPromise().then(d=>{
          resolve(user);
          console.log(d);
        }).catch(err=> reject(err));
      }else{
        reject('No hay resultados')
      }
    });
  }

  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }
}
