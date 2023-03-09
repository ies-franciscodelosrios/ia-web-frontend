import { Turn } from '../models/turn';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnService {

  constructor(private http: HttpClient) { }


  public async getAllTurns():Promise<Turn[]>{
    let endpoint = `http://localhost:8080/api/turn/getAllTurns`;
    let turns:any = await this.http.get(endpoint,this.header).toPromise();
    return turns;
  }

  public async getTurnById(turnId:number):Promise<Turn>{
    let endpoint = `http://localhost:8080/api/turn/getTurn/${turnId}`;
    let turn:any = await this.http.get(endpoint,this.header).toPromise();
    return turn;
  }

  public async getUserTurns(idNavision:string):Promise<Turn[]> {
    let endpoint = `http://localhost:8080/api/turn/getUserTurns/${idNavision}`;
    let turns:any = await this.http.get(endpoint,this.header).toPromise();
    return turns;
  }

  public async saveTurn(turn:Turn):Promise<Turn> {
    let endpoint= `http://localhost:8080/api/turn/save/assignUser/${localStorage.getItem("user_current")}`;

    return new Promise ((resolve, reject) => {
      if(turn) {
        this.http.post(endpoint,turn,this.header).toPromise().then(response => {
          resolve(turn);
          console.log(response);
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
