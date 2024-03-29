import { NgModule } from '@angular/core';


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
import { ToastrModule } from 'ngx-toastr';
import { Ng5SliderModule } from 'ng5-slider';
import { LeyendComponent } from './components/leyend/leyend.component';
import { StepsComponent } from './components/steps/steps.component';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginatorIntl} from "@angular/material/paginator";
import {CustomPaginator} from "./models/CustomPaginatorConfiguration";
import { TextareaAutosizeDirective } from './directives/textarea-autosize.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginAdminComponent,
    PageNotFoundComponent,
    SidebarComponent,
    QuestionarieComponent,
    FooterComponent,
    LeyendComponent,
    StepsComponent,
    TextareaAutosizeDirective
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
        MatTableModule,
        Ng5SliderModule,
        ToastrModule.forRoot()
    ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    },
    { provide: MatPaginatorIntl, useValue: CustomPaginator() }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
