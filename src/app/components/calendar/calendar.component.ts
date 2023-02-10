import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import intercationPlugin from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarService } from 'src/app/services/calendar.service';
import { NgbModal,NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../models/event';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  user:User
  codigo:string
  modalRef: NgbModalRef | undefined;

  @ViewChild('viewModal')viewModal: TemplateRef<any>;
  @ViewChild('deleteModal')deleteModal: TemplateRef<any>;
  eventName: string = "";
  eventDescription: string = "";
  date:Date;
  newEvents : [];
  newEvento : Event;
  deleteEventTitle: string ="";
  public events:any[];
  public options:any;


  constructor(private apiUser:UserService,private calendarService: CalendarService,  private modalService: NgbModal) { }

   ngOnInit(){
    this.getUserByDNI();
    console.log(this.codigo)
    setTimeout(() => {
    this.calendarService.getEventsByUser(this.codigo).subscribe((data: any[]) => {
      console.log(data);
      this.events = data.map((e:any) => ({title: e.name, start: e.date_Start_Event, allDay : true}));
      console.log(this.events);
    });
  }, 200);
    this.options = {
      themeSystem: 'bootstrap',
      plugins: [bootstrapPlugin,dayGridPlugin,timeGridPlugin,intercationPlugin],
      defaultDate: new Date(),
      eventLimit: false,
      locale: esLocale,
      header:{
        left:"prev,next",
        center:'title',
        right:'dayGridMonth,timeGridWeek,timeGridDay'
      },
      editable:true,
      events: this.events,
      dateClick:this.onDateClick.bind(this),
      eventClick:this.handleEventClick.bind(this)
    }


  }


  onDateClick(date: { dateStr: Date; }) {
    this.modalRef = this.modalService.open(this.viewModal);
    this.date = date.dateStr;
  }

  public async createEvent() {
    let event : Event ={
      name: this.eventName,
      create_date: this.date,
      date_Start_Event:this.date,
      description:this.eventDescription,
      user_id:this.codigo
    };
    console.log(event);
    await this.calendarService.createEvent(event,this.codigo)
    this.modalService.dismissAll();
    this.eventName = "";
    this.eventDescription= "";
    this.ngOnInit();
  }


  public async getUserByDNI(){
    try{
      this.user=await this.apiUser.getUserProfileByIdNavision(localStorage.getItem("user_current"));
      await this.getCodeUser();
      console.log(this.user);
    }catch(err){
      console.error(err);
    }
  }

  public async getCodeUser(){
    try {
      this.codigo=this.user.codigo;
      console.log(this.codigo)
    } catch (err) {
      console.error(err);
    }

  }

  handleEventClick(arg){
    this.deleteEventTitle = arg.event._def.title;
  }
/*
  deleteEvent(arg){
    for (var i = 0; i < this.newEvents.length; i++) {
      if (this.newEvents[i].title == this.deleteEventTitle) {
        this.newEvents.splice(i, 1);
        this.options.events=[];
        break;
      }
    }
    this.options.events = [...this.newEvents];
  }
  */
  cancelDialog(){
    this.eventName = "";
    this.eventDescription="";
    this.ngOnInit();
    this.modalService.dismissAll();
  }

}

