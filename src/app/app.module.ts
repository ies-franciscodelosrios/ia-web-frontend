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
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {FullCalendarModule } from 'primeng/fullcalendar';
import { NgbdTablePagination } from './components/ngbd-table-pagination/ngbd-table-pagination.component';
import { AdmindashboardComponent } from './components/admindashboard/admindashboard.component';
import { UseradmindashboardComponent } from './components/useradmindashboard/useradmindashboard.component';
import { MatPaginatorModule } from '@angular/material/paginator';
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
    MatPaginatorModule,
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
