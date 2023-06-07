import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from} from 'rxjs';
import { PollAssignment } from '../models/survey';
import { environment } from 'src/environments/environment';
import { find, switchMap } from 'rxjs/operators';
import {QuestionResponseObject, Response} from "../models/surveyFG";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private pollsAssignmentSubject$: BehaviorSubject<PollAssignment[]> = new BehaviorSubject([]);
  private pollAssignmentFound$: BehaviorSubject<PollAssignment> = new BehaviorSubject(null);
  private questionsFound$: BehaviorSubject<QuestionResponseObject[]> = new BehaviorSubject([]);

  constructor(private http: HttpClient) {}

  get PollsAssignmentData() {
    return this.pollsAssignmentSubject$.asObservable();
  }

  get PollsAssignmentFound() {
    return this.pollAssignmentFound$.asObservable();
  }

  get AllQuestions() {
    return this.questionsFound$.asObservable();
  }

  setAllQuestions(data) {
    this.questionsFound$.next(data);
  }

  setPollsAssignmentData(data) {
    this.pollsAssignmentSubject$.next(data);
  }

  setPollsAssignmentFound(data) {
    this.pollAssignmentFound$.next(data);
  }

  loadData(idNavision: string) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('idNavision', idNavision)

    let endpoint = environment.endpoint+environment.getAllPollsAssignmentsByUser;

    this.http.get<PollAssignment[]>(endpoint,{'headers':headers} ).subscribe(
      data => {
        this.pollsAssignmentSubject$.next(data);
      },
      error => {
        console.error('Error al cargar los datos de PollsAssignment:', error);
      }
    );
  }

  findPollAssignment(pollId: number){
    this.PollsAssignmentData
    .pipe(
      switchMap(data => from(data)),
      find(data => data.id === pollId)
    ).subscribe(
      data => {
        this.pollAssignmentFound$.next(data);
      },
      error => {
        console.error('Error al encontrar los datos de PollsAssignment escogido:', error)
      }
    );
  }


  getQuestions(id_qg: string,polls_assignment_id:string) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('id_qg', id_qg)
    headers = headers.append('polls_assignment_id', polls_assignment_id)

    let endpoint = environment.endpoint+environment.getAllQuestions;

    this.http.get<QuestionResponseObject[]>(endpoint,{'headers':headers} ).subscribe(
      data => {
            this.setAllQuestions(data);
      },
      error => {
        console.error('Error al cargar los datos de la pregunta:', error);
      }
    );
  }

  public  createResponse(response:Response, pa_id:string):Promise<any> {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('pa_id', pa_id)
    let endpoint=environment.endpoint+environment.createResponse;
    return this.http.post(endpoint, response, {'headers': headers}).toPromise();

    }



}
