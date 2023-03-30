import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { NgbModule , NgbToastModule} from '@ng-bootstrap/ng-bootstrap';
import { ProfileRoutingModule } from './profile-routing/profile-routing.module';

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
