import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './components/calendar/calendar.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { NgbdTablePagination } from './components/ngbd-table-pagination/ngbd-table-pagination.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { UseradmindashboardComponent } from './components/useradmindashboard/useradmindashboard.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { RefreshTableDirective } from './directives/refresh-table.directive'  
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { PaginatePipe } from './pipes/paginate.pipe';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    LoginComponent,
    HomeComponent,
    LoginAdminComponent,
    HomeAdminComponent,
    ProfileComponent,
    PageNotFoundComponent,
    SidebarComponent,
    NgbdTablePagination,
    AdmindashboardComponent,
    UseradmindashboardComponent,
    RefreshTableDirective,
    PaginatePipe
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    NgbToastModule
  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
