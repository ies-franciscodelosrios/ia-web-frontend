import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbdTablePagination } from '../ngbd-table-pagination/ngbd-table-pagination.component';
import { RefreshTableDirective } from 'src/app/directives/refresh-table.directive';
import { HomeComponent } from './home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../shared/angular-material/angular-material.module';
import { HomeRoutingModule } from './home-routing/home-routing.module';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    HomeComponent,
    NgbdTablePagination,
    RefreshTableDirective,
  ],
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    AngularMaterialModule,
    HomeRoutingModule,
    ToastrModule.forRoot()
  ],
  exports: [
    HomeComponent,
  ]
})
export class HomeModule { }
