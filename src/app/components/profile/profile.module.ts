import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {NgbModule, NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfileRoutingModule } from './profile-routing/profile-routing.module';
import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    NgbModule,
    NgbToastModule,
    ReactiveFormsModule,
    FormsModule,
    ProfileRoutingModule
  ],
  exports: [
    ProfileComponent,
  ]
})
export class ProfileModule { }
