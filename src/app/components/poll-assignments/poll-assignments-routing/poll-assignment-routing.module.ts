import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PollAssignmentsComponent } from './../poll-assignments.component';

const routes: Routes = [
   { path: '', component: PollAssignmentsComponent }, 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]

})
export class PollAssignmentRoutingModule { }