import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdmindashboardRoutingModule } from './admindashboard-routing/admindashboard-routing.module';
import { AdmindashboardComponent } from './admindashboard.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [AdmindashboardComponent],
  imports: [
    CommonModule,
    NgbModule,
    NgbToastModule,
    ReactiveFormsModule,
    FormsModule,
    AdmindashboardRoutingModule,
  ],
  exports: [AdmindashboardComponent]
})
export class AdmindashboardModule { }
