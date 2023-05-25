import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginAdminComponent } from './components/login-admin/login-admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AngularMaterialModule } from './components/shared/angular-material/angular-material.module';
import { QuestionarieComponent } from './components/questionarie/questionarie.component';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from './components/footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAdminComponent,
    PageNotFoundComponent,
    SidebarComponent,
    QuestionarieComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbToastModule,
    AngularMaterialModule,
    MatTableModule
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
