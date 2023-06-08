import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Poll} from "../models/survey";
import {BehaviorSubject, throwError} from "rxjs";
import {QuestionResponseObject} from "../models/surveyFG";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PollServiceService {

  constructor(private http:HttpClient) { }
  public updatePoll(paId: string,body:Poll) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'paId': paId
    });
    const endpoint = `${environment.endpoint}${environment.updatePoll}`;
    return this.http.put<Poll>(endpoint, body, { headers })
  }
}
