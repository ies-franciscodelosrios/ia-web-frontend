import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Question } from 'src/app/models/questions';
import { Survey2 } from 'src/app/models/survey2';

@Component({
  selector: 'app-text-question',
  templateUrl: './text-question.component.html',
  styleUrls: ['./text-question.component.css']
})
export class TextQuestionComponent implements OnInit {

  survey: Survey2;
  surveyForm: FormGroup;

  preguntas: Question[] = [
    new Question('¿Que te parecio la charla?'),
    new Question('¿La repetirías?'),
    new Question('¿Que propones que cambiemos?'),
    new Question('¿Que propones que cambiemos?'),
    new Question('¿Que propones que cambiemos?'),
    new Question('¿Que propones que cambiemos?'),
    new Question('¿Que propones que cambiemos?')

  ]

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.survey = new Survey2('Encuesta sobre la charla de SPA', this.preguntas);

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
}