import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashboardComponent } from '../admindashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdmindashboardComponent }, 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AdmindashboardRoutingModule { }
