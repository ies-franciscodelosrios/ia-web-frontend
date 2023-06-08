import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from 'src/app/services/survey.service';
import { UserService } from 'src/app/services/user-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})
export class SurveyComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'startDate',
    'endDate',
    'active',
  ];
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('selectBoxSurvey') selectBoxSurvey: ElementRef;
  @ViewChild('selectBoxUser') selectBoxUser: ElementRef;
  @ViewChild('selectBoxSurveyQuestion') selectBoxSurveyQuestion: ElementRef;
  @ViewChild('selectBoxQuestion') selectBoxQuestion: ElementRef;

  @ViewChild('inputSurveyValue') inputSurveyValue: ElementRef;
  @ViewChild('inputUserValue') inputUserValue: ElementRef;
  @ViewChild('inputSurveyQuestionValue') inputSurveyQuestionValue: ElementRef;
  @ViewChild('inputQuestionValue') inputQuestionValue: ElementRef;
  
  @ViewChild('inputSearchUser') inputSearchUser: ElementRef;
  @ViewChild('inputSearchSurvey') inputSearchSurvey: ElementRef;
  @ViewChild('inputSearchSurveyQuestion') inputSearchSurveyQuestion: ElementRef; 
  @ViewChild('inputSearchQuestion') inputSearchQuestion: ElementRef;  
 
  @ViewChild('ulOptionsUser') ulOptionsUser: ElementRef;
  @ViewChild('ulOptionsSurvey') ulOptionsSurvey: ElementRef;
  @ViewChild('ulOptionsQuestion') ulOptionsQuestion: ElementRef;
  @ViewChild('ulOptionsSurveyQuestion') ulOptionsSurveyQuestion: ElementRef;

  surveyForm: FormGroup;
  questionTextForm: FormGroup;
  questionRadioForm: FormGroup;
  questionSliderForm: FormGroup;

  users: string[] = [];
  surveys = [];
  questions = [];
  questionsNames: string[] = [];
  surveysNames: string[] = [];
  searchText = '';

  constructor(
    private surveyService: SurveyService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.surveyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      personCategory: ['', Validators.required],
      active: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
    });

    this.questionTextForm = this.fb.group({
      text: ['', Validators.required]
    });

    this.questionRadioForm = this.fb.group({
      text: ['', Validators.required],
      radioResponse1: ['', Validators.required],
      radioResponse2: ['', Validators.required],
      radioResponse3: ['', Validators.required],
    });

    this.questionSliderForm = this.fb.group({
      text: ['', Validators.required]
    });

    this.surveyService.getAllQuestionnaires().then((surveys) => {
      this.surveys = surveys;
      this.dataSource = new MatTableDataSource<any>(surveys);
      this.dataSource.paginator = this.paginator;
      surveys.map((survey) => {
        this.surveysNames.push(survey.name);
      });
    });

    this.userService.getAllUsers().then((users) => {
      users.map((user) => {
        this.users.push(user.login);
      });
    });

    this.surveyService.getAllQuestions().then(questions => {
      questions.map(question => {
        this.questionsNames.push(question.text)
        this.questions.push(question)
      })
    })
  }

  async toggleActive(qg) {
    qg.active = !qg.active;
    await this.surveyService.updateQuestionnaire(qg.id, qg)
  }

  async submitSurvey() {
    if (this.surveyForm.invalid) {
      this.toastService.error('Debes de rellenar todos los campos de la encuesta', 'Encuesta inválida', {
        timeOut: 2000,
      });
      return;
    }
    try {
     let survey:any = await this.surveyService.createQuestionnaire(this.surveyForm.value);
      this.toastService.success('Su encuesta ha sido creada correctamente', 'Encuesta Válida',  {
        timeOut: 2000,
      });
      this.surveysNames.push(survey.name);
      this.surveys.push(survey)
      this.dataSource = new MatTableDataSource<any>(this.surveys);
    } catch(err) {
      this.toastService.error('Se ha producido un error al crear la encuesta', 'Encuesta inválida', {
        timeOut: 2000,
      });
    }
  }

  async submitTextQuestion() {
    let question = this.questionTextForm.value
    if(!question.text) {
      this.toastService.error('Debes de rellenar todos los campos de la pregunta', 'Pregunta Inválida', {
        timeOut: 2000,
      });
      return;
    }
    question.type = 'texto'
    this.toastService.success('Su pregunta ha sido creada correctamente', 'Pregunta Válida',  {
      timeOut: 2000,
    });
    await this.surveyService.createQuestion(question);
    this.questionsNames.push(question.text)
  }

  async submitRadioQuestion() {
    let question:any = {};
    let {text, radioResponse1, radioResponse2, radioResponse3} = this.questionRadioForm.value
    question.text = `${text};${radioResponse1};${radioResponse2};${radioResponse3}`
    if(!text || !radioResponse1 || !radioResponse2 || !radioResponse3) {
      this.toastService.error('Debes de rellenar todos los campos de la pregunta', 'Pregunta Inválida', {
        timeOut: 2000,
      });
      return;
    }
    question.type = 'radio'
    this.toastService.success('Su pregunta ha sido creada correctamente', 'Pregunta Válida',  {
      timeOut: 2000,
    });
    await this.surveyService.createQuestion(question);
    this.questionsNames.push(question.text)
  }

  async submitSliderQuestion() {
    let question = this.questionSliderForm.value
    if(!question.text) {
      this.toastService.error('Debes de rellenar todos los campos de la pregunta', 'Pregunta Inválida', {
        timeOut: 2000,
      });
      return;
    }
    question.type = 'slide'
    this.toastService.success('Su pregunta ha sido creada correctamente', 'Pregunta Válida',  {
      timeOut: 2000,
    });
    await this.surveyService.createQuestion(question);
    this.questionsNames.push(question.text)
  }

  
  assignSurvey() {
    let surveyName = this.inputSurveyValue.nativeElement.value;
    let surveyId
    try {
      surveyId = this.surveys.find((survey) => {
        return survey.name === surveyName;
      }).id;
    } catch(err){
      console.log(err)
    }
    let userLogin = this.inputUserValue.nativeElement.value;
    if(!userLogin || !surveyId) {
      this.toastService.error('Debes de proporcionar 2 valores para realizar la asignación', 'Asignación Inválida', {
        timeOut: 2000,
      });
      return;
    }
    this.toastService.success('Su asignación ha sido creada correctamente', 'Asignación Válida',  {
      timeOut: 2000,
    });
    this.surveyService.assignCuestionnaireToUser(surveyId, userLogin);
  }

  assignSurveyQuestion() {
    let surveyName = this.inputSurveyQuestionValue.nativeElement.value;
    let surveyId = this.surveys.find((survey) => {
      return survey.name === surveyName;
    })?.id;
    let questionName = this.inputQuestionValue.nativeElement.value;
    let questionId = this.questions.find((question) => {
      return question.text === questionName;
    })?.id;
    if(!surveyId || !questionId) {
      this.toastService.error('Debes de proporcionar 2 valores para realizar la asignación', 'Asignación Inválida', {
        timeOut: 2000,
      });
      return;
    }
    this.toastService.success('Su asignación ha sido creada correctamente', 'Asignación Válida',  {
      timeOut: 2000,
    });
    this.surveyService.assignQuestionToSurvey(surveyId, questionId);    
  }

  toggleSelectBoxSurvey() {
    this.selectBoxSurvey.nativeElement.classList.toggle('active');
  }

  toggleSelectBoxUser() {
    this.selectBoxUser.nativeElement.classList.toggle('active');
  }

  toggleSelectBoxSurveyQuestion() {
    this.selectBoxSurveyQuestion.nativeElement.classList.toggle('active');
  }

  toggleSelectBoxQuestion() {
    this.selectBoxQuestion.nativeElement.classList.toggle('active');
  }

  setInputSurveyValue(survey) {
    this.inputSurveyValue.nativeElement.value = survey;
    this.selectBoxSurvey.nativeElement.classList.remove('active');
  }

  setInputUserValue(user) {
    this.inputUserValue.nativeElement.value = user;
    this.selectBoxUser.nativeElement.classList.remove('active');
  }

  setInputSurveyQuestionValue(survey) {
    this.inputSurveyQuestionValue.nativeElement.value = survey;
    this.selectBoxSurveyQuestion.nativeElement.classList.remove('active');
  }

  setInputQuestionValue(question) {
    this.inputQuestionValue.nativeElement.value = question;
    this.selectBoxQuestion.nativeElement.classList.remove('active');
  }

  filterUsers(): void {
    let filter = this.inputSearchUser.nativeElement.value.toLowerCase();
    let ul = this.ulOptionsUser.nativeElement;
    let liElements = ul.children;

    for (var i = 0; i < liElements.length; i++) {
      let li = liElements[i];
      let textValue = li.textContent;

      if (textValue.toLowerCase().indexOf(filter) > -1) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  }

  filterSurveys(): void {
    let filter = this.inputSearchSurvey.nativeElement.value.toLowerCase();
    let ul = this.ulOptionsSurvey.nativeElement;
    let liElements = ul.children;

    for (var i = 0; i < liElements.length; i++) {
      let li = liElements[i];
      let textValue = li.textContent;

      if (textValue.toLowerCase().indexOf(filter) > -1) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  }

  filterSurveysQuestion() {
    let filter = this.inputSearchSurveyQuestion.nativeElement.value.toLowerCase();
    let ul = this.ulOptionsSurveyQuestion.nativeElement;
    let liElements = ul.children;

    for (var i = 0; i < liElements.length; i++) {
      let li = liElements[i];
      let textValue = li.textContent;

      if (textValue.toLowerCase().indexOf(filter) > -1) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  }

  filterQuestions() {
    let filter = this.inputSearchQuestion.nativeElement.value.toLowerCase();
    let ul = this.ulOptionsQuestion.nativeElement;
    let liElements = ul.children;

    for (var i = 0; i < liElements.length; i++) {
      let li = liElements[i];
      let textValue = li.textContent;

      if (textValue.toLowerCase().indexOf(filter) > -1) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
