import { PaginatePipe } from './../../pipes/paginate.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UseradmindashboardRoutingModule } from './useradmindashboard-routing/useradmindashboard-routing.module';
import { UseradmindashboardComponent } from './useradmindashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ToastrModule } from 'ngx-toastr';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';

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
    UseradmindashboardRoutingModule,
    AngularMaterialModule,
    ToastrModule.forRoot()
  ],
  exports: [UseradmindashboardComponent]
})
export class UseradmindashboardModule { }
