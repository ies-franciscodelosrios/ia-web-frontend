import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy} from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarService } from 'src/app/services/calendar.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Event } from '../../models/event';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import { CalendarOptions, EventClickArg } from '@fullcalendar/angular';
import tippy from "tippy.js";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit{
  user:User
  codigo:string
  modalRef: NgbModalRef | undefined;

  @ViewChild('viewModal')viewModal: TemplateRef<any>;
  @ViewChild('deleteModal')deleteModal: TemplateRef<any>;
  eventName: string = "";
  nombre: string = "Evento";
  descripcion: string="Descripcion del evento";
  eventId: string="Id del evento"
  eventDescription: string = "";
  date:Date;
  newEvents : [];
  newEvento : Event;
  deleteEventTitle: string ="";
  public events:any[];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  currentEvents: Event[] = [];


  constructor(private apiUser:UserService,private calendarService: CalendarService,  private modalService: NgbModal, private changeDetector: ChangeDetectorRef) {

  }


  async ngOnInit(){
    await this.getUserByDNI();
    this.loadEvents();
    this.changeDetector.detectChanges();
    setTimeout(() => {
      this.calendarService.getEventsByUser(this.codigo).then((data: any[]) => {
      this.calendarOptions.events=this.events = data.map((e:any) => ({id: e.id, title: e.name, start: e.date_Start_Event, description: e.description, allDay : true}));
      });
      this.changeDetector.detectChanges();
  }, 500);

    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      initialView: 'dayGridMonth',
      weekends: true,
      editable: true,
      events:this.events,
      eventDidMount: (info) => {
        tippy(info.el, {
         content: "Descripción: "+info.event.extendedProps.description
         })
       },
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      locale:esLocale,
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
      dateClick:this.onDateClick.bind(this),
      eventClick:this.handleEventClick.bind(this),
      /* eventClick: function(info) {
        alert('Nombre: ' + info.event.title);
        alert('Descripcion: ' + info.event.extendedProps.description);
        // change the border color just for fun
        info.el.style.borderColor = 'red';
      }
    */
   };

   this.changeDetector.detectChanges();
  };



  public async loadEvents(){
    this.calendarService.getEventsByUser(this.codigo).then((data: any[]) => {
      this.calendarOptions.events=this.events = data.map((e:any) => ({id: e.id, title: e.name, start: e.date_Start_Event, description: e.description, allDay : true}));
    });
    this.changeDetector.detectChanges();
  }

  onDateClick(date: { dateStr: Date; }) {
    this.modalRef = this.modalService.open(this.viewModal);
    this.date = date.dateStr;
    this.changeDetector.detectChanges();
  }

  onEventClick(date: { dateStr: Date; }) {
    this.modalRef = this.modalService.open(this.deleteModal);
    this.date = date.dateStr;
    this.changeDetector.detectChanges();
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
    this.changeDetector.detectChanges();
    this.ngOnInit();
    this.changeDetector.detectChanges();
  }

  public async deleteEvent(){
    this.calendarService.deleteEvent(this.codigo,this.eventId);
    this.modalService.dismissAll();
    this.changeDetector.detectChanges();
    this.ngOnInit()
    this.changeDetector.detectChanges();
  }
  public async updateEvent(){
    let event : Event ={
      id:this.eventId,
      name: this.nombre,
      create_date: this.date,
      date_Start_Event:this.date,
      description:this.descripcion,
      user_id:this.codigo
    };
    await this.calendarService.updateEvent(event,this.eventId)
    this.modalService.dismissAll();
    this.ngOnInit();
    this.changeDetector.detectChanges();
  }



  public async getUserByDNI(){
    try{
      this.user=await this.apiUser.getUserProfileByIdNavision(localStorage.getItem("user_current"));
      await this.getCodeUser();
    }catch(err){
      console.error(err);
    }
    this.changeDetector.detectChanges();
  }

  public async getCodeUser(){
    try {
      this.codigo=this.user.codigo;
    } catch (err) {
      console.error(err);
    }
    this.changeDetector.detectChanges();
  }

  public async handleEventClick(clickInfo: EventClickArg) {
    this.nombre=clickInfo.event.title
    console.log(this.nombre)
    this.descripcion=clickInfo.event.extendedProps.description
    console.log(this.descripcion)
    this.date=clickInfo.event.start
    this.eventId=clickInfo.event.id
    console.log(this.eventId)
    this.modalRef = this.modalService.open(this.deleteModal);
    this.ngOnInit();
    this.changeDetector.detectChanges();
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
    this.changeDetector.detectChanges();
  }

}

