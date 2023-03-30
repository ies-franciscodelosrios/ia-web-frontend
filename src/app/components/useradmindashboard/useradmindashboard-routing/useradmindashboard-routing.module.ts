import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UseradmindashboardComponent } from '../useradmindashboard.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: UseradmindashboardComponent }, 
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class UseradmindashboardRoutingModule { }
