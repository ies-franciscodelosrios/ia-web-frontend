import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionRadio } from 'src/app/models/questionRadio';
import { Survey2 } from 'src/app/models/survey2';

@Component({
  selector: 'app-select-question',
  templateUrl: './select-question.component.html',
  styleUrls: ['./select-question.component.css']
})
export class SelectQuestionComponent implements OnInit {
  radioValue: string;
  radioForm: FormGroup;
  //obj: Question [] = [];
  survey: Survey2;
  surveyForm: FormGroup;

  constructor(private fb:FormBuilder, private http: HttpClient) {

    this.radioForm=this.fb.group({
      response: ['', Validators.compose([Validators.required])]
    })
   }

   ngOnInit() {
    this.survey = new Survey2('My Survey', [
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
      new QuestionRadio('Tu team manager tiene ganas de vivir?', ['No, no tiene', 'Algo de ganas tiene', 'El tio tiene tantas ganas que es un pesado']),
    ]);

    this.surveyForm = this.fb.group({
      questions: this.fb.array(
        this.survey.questions.map((question) =>
          this.fb.group({
            answer: '',
          })
        )
      ),
    });
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
