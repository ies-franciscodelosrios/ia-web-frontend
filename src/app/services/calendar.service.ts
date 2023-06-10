import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Events } from '../models/event';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {


  constructor(private http: HttpClient) { }

  public async getEvents(): Promise<Events[]>{
    let headers = new HttpHeaders();
    headers=headers.append('content-type','application/json')
    let endpoint=environment.endpoint+environment.getAllEvents
    let events:any=await this.http.get(endpoint,{'headers':headers}).toPromise();
   return events;
  }




  public async getEventsByUser(userId:string):Promise<Events[]>{
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('userId', userId)
    let endpoint=environment.endpoint+environment.getEventUser;
    console.log(endpoint);
    let events:any=await this.http.get(endpoint,{'headers':headers}).toPromise();
    console.log(events);
    return events;
  }

  public async deleteEvent(userId: string, eventId: string){
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('userId', userId)
    headers=headers.append('eventId', eventId)
    let endpoint=environment.endpoint+environment.delEventUser;
    return await this.http.delete(endpoint,{'headers':headers}).toPromise();
  }

  public async updateEvent(eventId: string,event:Events, assignbyuser_id:string):Promise<Events>{
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('Id', eventId)
    headers=headers.append('assignbyuser_id', assignbyuser_id)
    let endpoint=environment.endpoint+environment.putEventUpdate;
    let events:any=await this.http.put(endpoint,event,{'headers':headers}).toPromise();
    return events;
  }



  public async createEvent(event:Events, userId:string, assignbyuser_id:string):Promise<Events> {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('userId', userId)
    headers=headers.append('assignbyuser_id', assignbyuser_id)
    let endpoint=environment.endpoint+environment.postEventCreate;
    let events:any=await this.http.post(endpoint,event,{'headers':headers}).toPromise();
    return events;

  }

}
