import { Turn } from '../models/turn';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor(private http: HttpClient) { }

  public async getTurnById(turnId:string):Promise<Turn>{
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('turnId', turnId)
    let endpoint = environment.endpoint+environment.getTurnById;
    let turn:any = await this.http.get(endpoint,{'headers':headers}).toPromise();
    return turn;
  }

  public async getUserTurns(idNavision:string):Promise<Turn[]> {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('IdNavision', idNavision)
    let endpoint = environment.endpoint+environment.getUserTurns;
    let turns:any = await this.http.get(endpoint,{'headers':headers}).toPromise();
    return turns;
  }

  public async saveTurn(turn:Turn):Promise<Turn> {
    let endpoint = environment.endpoint+environment.saveTurn;

    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('IdNavision', localStorage.getItem("user_current"))

    return new Promise ((resolve, reject) => {
      if(turn) {
        this.http.post(endpoint,turn,{'headers':headers}).toPromise().then(response => {
          resolve(turn);
        }).catch(err => reject(err));
      } else {
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
