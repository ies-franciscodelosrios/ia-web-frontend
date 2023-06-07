import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Question } from 'src/app/models/questions';
import {modelObject} from 'src/app/models/surveyFG';
import {combineLatest, Observable, Subscription} from "rxjs";
import {SurveyService} from "../../../services/survey.service";
import {take, takeLast} from "rxjs/operators";
import {PollAssignment} from "../../../models/survey";

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css']
})
export class TextQuestionComponent implements OnInit {
  questionnaire: FormGroup;
  preguntas: Question [] = [];
  questionsSub: Subscription;
  pollsAssignmentFound: PollAssignment;
  nameQG: string

  constructor(private fb: FormBuilder, private _surveyService: SurveyService) {
  }

  ngOnInit() {


  }

  /*
  combinateSubscriptions(){
    combineLatest(
      this._surveyService.AllQuestions,
      this._surveyService.PollsAssignmentFound
    ).subscribe(([questionsData, pollsData]) => {
      console.log([questionsData,pollsData]);
      const questionsArray = this.questionnaire.get('questions') as FormArray;
      questionsData.forEach((questionData: Question) => {
        const questionGroup = this.createQuestion(questionData.text);
        questionsArray.push(questionGroup);
      });

      this.pollsAssignmentFound = pollsData;
      this.nameQG = pollsData.questionaryGroup.name;
    });
  }

   */

}
