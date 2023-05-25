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

  
}
