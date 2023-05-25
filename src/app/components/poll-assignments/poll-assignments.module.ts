import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PollAssignmentsComponent } from './poll-assignments.component';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { PollAssignmentRoutingModule } from './poll-assignments-routing/poll-assignment-routing.module';


@NgModule({
  declarations: [
    PollAssignmentsComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    PollAssignmentRoutingModule
  ],
  exports: [
    PollAssignmentsComponent
  ]
})
export class PollAssignmentsModule { }
