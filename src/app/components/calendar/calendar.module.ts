import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarRoutingModule } from './calendar-routing/calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

FullCalendarModule.registerPlugins([
  // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [   
    CalendarComponent
  ],
  imports: [
    CommonModule,
    FullCalendarModule,
    NgbModule,
    NgbToastModule,
    ReactiveFormsModule,
    FormsModule,
    CalendarRoutingModule
  ],
  exports: [
    CalendarComponent
  ],
})
export class CalendarModule { }
