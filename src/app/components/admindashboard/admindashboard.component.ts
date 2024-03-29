import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Events } from 'src/app/models/event';
import { Turn } from 'src/app/models/turn';
import { User } from 'src/app/models/user';
import { CalendarService } from 'src/app/services/calendar.service';
import { LoginService } from 'src/app/services/login-service';
import { TurnService } from 'src/app/services/turn-service';
import { UserService } from 'src/app/services/user-service';
import { SurveyService } from 'src/app/services/survey.service';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  users:User [] = [];
  turns:Turn [] = [];
  userRelations:any = []
  surveys:any = []
  countUser:any;
  countRelations:any;
  countTurns:any;
  countSurveys:any;
  constructor(private userService:UserService,private surveyService:SurveyService,private turnService:TurnService, private router:Router) { }

  ngOnInit(): void {
    this.getAll();
  }

  navigateToUsers() {
    this.router.navigate(['/users'])
  }

  async getAll(){
    this.users= await this.userService.getAllUsers();
    this.countUser=this.users.length
    this.userRelations= await this.userService.getAllUsersRelations();
    this.countRelations=this.userRelations.length
    this.surveys= await this.surveyService.getAllQuestionnaires()
    this.countSurveys=this.surveys.length
    this.turns= await this.turnService.getUserTurns(localStorage.getItem('user_current'));
    this.countTurns=this.turns.length
  }
  

}
