import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {modelObject} from "../../../models/surveyFG";


@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrls: ['./select-question.component.css']
})
export class SelectQuestionComponent implements OnInit {
  radioValue: string;
  radioForm: FormGroup;
  survey: modelObject;
  surveyForm: FormGroup;

  constructor(private fb:FormBuilder, private http: HttpClient) {

    this.radioForm=this.fb.group({
      response: ['', Validators.compose([Validators.required])]
    })
   }

   ngOnInit() {
    //this.survey = new survey('My Survey', []);


  }

  onSubmit() {
    const responses = this.surveyForm.value.questions.map(
      (question) => question.answer
    );
    console.log(responses);
  }
/*
  getDataJSON(){
    this.http.get('../../../assets/json/questionTypes.json').subscribe(
      {
        next: (questions) => {
          console.log(questions);

          this.obj=questions as Question[];
        },
        error: (errors) => {
          console.log(errors);

        }
      }
    )
  }

*/

  logForm(){
    const inputValue= this.radioForm.get("response").value
    this.radioValue=inputValue;
    console.log(this.radioValue);


  }

}
