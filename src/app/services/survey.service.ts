import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, from} from 'rxjs';
import { PollAssignment } from '../models/survey';
import { environment } from 'src/environments/environment';
import { find, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private pollsAssignmentSubject$: BehaviorSubject<PollAssignment[]> = new BehaviorSubject([]);
  private pollAssignmentFound$: BehaviorSubject<PollAssignment> = new BehaviorSubject(null);

  constructor(private http: HttpClient) {}

  get PollsAssignmentData() {
    return this.pollsAssignmentSubject$.asObservable();
  }

  get PollsAssignmentFound() {
    return this.pollAssignmentFound$.asObservable();
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

  public async createQuestionnaire(questionnaire) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    let endpoint = environment.endpoint+environment.createQuestionnaire;
    return this.http.post(endpoint,questionnaire,{'headers':headers}).toPromise();
  }

  public async createQuestion(question) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    let endpoint = environment.endpoint+environment.createQuestion;
    return this.http.post(endpoint,question,{'headers':headers}).toPromise();
  }

  public async updateQuestionnaire(qgId,questionnaire) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('qgId', ""+qgId)
    let endpoint = environment.endpoint+environment.updateQuestionnaire;
    return this.http.put(endpoint,questionnaire,{'headers':headers}).toPromise();
  }

  public async updateUserRelations(id1:string, id2:string) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('id1', id1)
    headers = headers.append('id2', id2)
    let endpoint = environment.endpoint+environment.updateUserRelations+"/"+id1+"/"+id2;
    return this.http.put(endpoint,{'headers':headers}).toPromise();
  }

  public async getAllQuestionnaires() {
    let endpoint=environment.endpoint+environment.getAllQuestionnaireGroups;
    let surveys:any=await this.http.get(endpoint,this.header).toPromise();
    return surveys;
  }

  public async getAllQuestions() {
    let endpoint=environment.endpoint+environment.getAllQuestions;
    let questions:any=await this.http.get(endpoint,this.header).toPromise();
    return questions;
  }

  public async getAllUserRelations() {
    let endpoint=environment.endpoint+environment.getAllUserRelations;
    let relations:any=await this.http.get(endpoint,this.header).toPromise();
    return relations;
  }

  public assignCuestionnaireToUser(surveyId: number, login: string) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('QGname', ""+surveyId)
    let pollAssignment = {   
      name: login,
      email: `${login}@atmira.com`,
      active: true,
      idNavision: login,
      idNavision2: "DEFAULT",
      personCategory: 2
    } 
    let endpoint = environment.endpoint+environment.assignCuestionnaireToUser;
    return this.http.post(endpoint,pollAssignment,{'headers':headers}).toPromise();
  }

  public assignQuestionToSurvey(surveyId, questionId) {
    let headers = new HttpHeaders()
    headers = headers.append('content-type','application/json')
    headers = headers.append('Access-Control-Allow-Origin', '*')
    headers = headers.append('id_qg', ""+surveyId)
    headers = headers.append('q', ""+questionId)
    let textRelation = {   
      question: {},
      questionaryGroup: {},
      relationId: 0
    } 
    let endpoint = environment.endpoint+environment.assignQuestionToSurvey;
    return this.http.post(endpoint,textRelation,{'headers':headers}).toPromise();
  }
  
  
  private get header():any{
    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json'
    }
  }
}
