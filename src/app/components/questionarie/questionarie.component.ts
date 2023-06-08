import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {QuestionResponseObject, Response} from '../../models/surveyFG';
import {SurveyService} from "../../services/survey.service";
import {Subscription} from "rxjs";
import {Poll, PollAssignment} from "../../models/survey";
import {Router} from "@angular/router";
import { NgbModal, NgbModalConfig} from "@ng-bootstrap/ng-bootstrap";
import {PollServiceService} from "../../services/poll-service.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-questionarie',
  templateUrl: './questionarie.component.html',
  styleUrls: ['./questionarie.component.css']
})
export class QuestionarieComponent implements OnInit, OnDestroy {
  questionnaire:FormGroup;
  preguntas:QuestionResponseObject []=[];
  QuestionResponseObject:QuestionResponseObject;
  questionsSub: Subscription;
  questionSub2: any
  pollsAssignmentFound: PollAssignment;
  nameQG:string
  state:Poll={
    active: false,
    completed: false,
    create_Date: "",
    lastModified: "",
    onLoad: false,
    signed: false
  }

  descriptionQG:string
  private resultSlider: number;
  arrayOptions: string []
  val: number = 65;
  response: number | string;

  constructor(private fb: FormBuilder,
              private _surveyService:SurveyService,
              private router:Router,
              private modalService: NgbModal,
              config: NgbModalConfig,
              public _poll:PollServiceService,
              private toastService: ToastrService) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit() {
    this.questionnaire = this.fb.group({
      questions: this.fb.array([])
    });
    this.getPA();
    this.loadQuestionsFromAPI();
    this.renderQuestions();
  }

  loadQuestionsFromAPI() {
    this.questionSub2=this._surveyService.getQuestions(
      this.numberToString(this.pollsAssignmentFound.questionaryGroup.id),
      this.numberToString(this.pollsAssignmentFound.id))
  }

  renderQuestions() {
    this.questionsSub = this._surveyService.AllQuestions.subscribe(data => {
      this.preguntas = data;
      const questionsArray = this.questionnaire.get('questions') as FormArray;

      data.forEach((questionData: QuestionResponseObject) => {
        let response: number | string = '';

        if (questionData.type === 'radio') {
          const arrayOptions = questionData.text.split(';');
          questionData.text = arrayOptions[0];
          const exceptOne = arrayOptions.slice(1);
          this.arrayOptions = exceptOne;
        }

        if (questionData.type === 'slide') {
          response = questionData.integer_value;
          this.val = response;
        }

        if (questionData.text_value != null || questionData.integer_value != null) {
          response = questionData.text_value != null && questionData.text_value.trim().length > 0
            ? questionData.text_value
            : questionData.integer_value;
        } else {
          questionData.integer_value = 0;
          questionData.text_value = "";
          questionData.polls_assignment_id = this.pollsAssignmentFound.id;
          questionData.text_relation_id = questionData.relation_id;
        }

        this.QuestionResponseObject = questionData;
        console.log(this.QuestionResponseObject)
        const questionGroup = this.createQuestion(this.QuestionResponseObject.text, this.QuestionResponseObject.type, response);
        questionsArray.push(questionGroup);
      });
    });
  }





  createQuestion(questionName: string, type:string, response:string | number): FormGroup {
    return this.fb.group({
      questionName: [questionName],
      type: [type],
      answer: [response]
    });
  }

  onSubmit() {
    console.log('papi')
    const originalResponses: QuestionResponseObject[] = this.preguntas;
    const currentResponses: any[] = this.questionnaire.value.questions;
    const promises: Promise<any>[] = [];
    for (let i = 0; i < originalResponses.length; i++) {
      if (originalResponses[i].integer_value !== currentResponses[i].answer && originalResponses[i].text_value !== currentResponses[i].answer) {
        const response: Response = {
          id: originalResponses[i].ResponseID|0,
          integer_Value: 0,
          text_Value: "",
          textRelation: {
            relationId: originalResponses[i].text_relation_id,
            questionaryGroup: null,
            question: null
          }
        };

        if (currentResponses[i].answer > 0) {
          response.integer_Value = currentResponses[i].answer;
        } else {
          response.text_Value = currentResponses[i].answer.toString();
        }

        const promise = this._surveyService.createResponse(response, this.pollsAssignmentFound.id.toString());
        promises.push(promise);
      }
    }
  }



  getPA(){
    this._surveyService.PollsAssignmentFound.subscribe(data => {
      this.pollsAssignmentFound = data
      this.state=data.poll
      this.nameQG=data.questionaryGroup.name
      this.descriptionQG=data.questionaryGroup.description
    })
  }

  confirmSurvey(content){
    this.modalService.open(content);
    this.toastService.success('Su encuesta ha sido guardada correctamente', 'Encuesta Válida',  {
      timeOut: 2000,
    });
  }

  saveSurvey(){
    this.onSubmit();
    this.toastService.success('Su encuesta ha sido guardada correctamente', 'Encuesta Válida',  {
      timeOut: 2000,
    });
    this.router.navigate(['/polls-assignment']);
  }

  numberToString(num: number): string {
    return num.toString();
  }

  backPA(content){
    this.router.navigate(['/polls-assignment']);
    this.modalService.dismissAll(content);
  }

  backPAwithConfirmed(content){
    this.router.navigate(['/polls-assignment']);
    this.state.completed=true;
    this._poll.updatePoll(this.pollsAssignmentFound.id.toString(),this.state).subscribe();
    this.modalService.dismissAll(content);
    this.toastService.success('Su encuesta ha sido guardada correctamente', 'Encuesta Válida',  {
      timeOut: 2000,
    });
  }

  signedSurvey(){
    this.state.signed=true;
    this.state.onLoad=false;
    this._poll.updatePoll(this.pollsAssignmentFound.id.toString(),this.state).subscribe();
    this.router.navigate(['/polls-assignment']);
    this.toastService.success('Su encuesta ha sido firmada correctamente', 'Encuesta Válida',  {
      timeOut: 2000,
    });
  }


  ngOnDestroy(): void {
    if(this.questionsSub instanceof Subscription){
      this.questionsSub.unsubscribe();

    }
  }

  get getPlacement(): string {
    return ((this.val * 14.5)) + `%`;
  }

  get getHappiness(): string {
    const moods = ["😞", "😕", "😐", "😊",  "🤩"];

    if (this.val === 0) {
      return "😠";
    }
    return moods[Math.floor(this.val / 20)];
  }

  open(content) {
    this.modalService.open(content);
  }

}
