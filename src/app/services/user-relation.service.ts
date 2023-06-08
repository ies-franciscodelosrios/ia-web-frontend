import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserRelation } from '../models/userRelation';

@Injectable({
  providedIn: 'root'
})
export class UserRelationService {

  constructor(private http:HttpClient) { }

  public async getActiverRelationsByIdNavision(idnavision:string):Promise<String[]>{
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    headers=headers.append('idnavision', idnavision)
    let endpoint=environment.endpoint+environment.getActiverRelationsByIdNavision;
    let activeUserRelations:any=await this.http.get(endpoint,{'headers':headers}).toPromise();
    return activeUserRelations;
  }

  public async createUserRelation(userRelationData: UserRelation): Promise<UserRelation> {
    let headers = new HttpHeaders()
    headers=headers.append('content-type','application/json')
    headers=headers.append('Access-Control-Allow-Origin', '*')
    let endpoint=environment.endpoint+environment.createUserRelation;
    let userRelation:any = await this.http.post(endpoint, userRelationData, { headers }).toPromise();
    return userRelation;
  }
}
