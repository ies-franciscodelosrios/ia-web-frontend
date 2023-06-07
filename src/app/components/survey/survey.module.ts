import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from './survey.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { SurveyRoutingModule } from './survey-routing/survey-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    AngularMaterialModule,
    SurveyRoutingModule,
    ToastrModule.forRoot()
  ],
  exports: [
    SurveyComponent
  ]
})
export class SurveyModule { }
