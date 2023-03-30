import { PaginatePipe } from './../../pipes/paginate.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UseradmindashboardRoutingModule } from './useradmindashboard-routing/useradmindashboard-routing.module';
import { UseradmindashboardComponent } from './useradmindashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    UseradmindashboardComponent,
    PaginatePipe,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbToastModule,
    ReactiveFormsModule,
    FormsModule,
    MatPaginatorModule,
    UseradmindashboardRoutingModule
  ],
  exports: [UseradmindashboardComponent]
})
export class UseradmindashboardModule { }
