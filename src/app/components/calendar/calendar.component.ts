import { Component, OnInit, TemplateRef, ViewChild, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import esLocale from '@fullcalendar/core/locales/es';
import { CalendarService } from 'src/app/services/calendar.service';
import { NgbAlert, NgbDateStruct, NgbModal, NgbModalOptions, NgbModalRef, NgbPopover, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';
import { Events } from '../../models/event';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import { Calendar, CalendarOptions, EventApi, EventClickArg, EventHoveringArg } from '@fullcalendar/angular';
import tippy from 'tippy.js'; // Importa Tippy.js
import { UserRelationService } from 'src/app/services/user-relation.service';
import { RolService } from 'src/app/services/rol-service';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  user: User
  userModal: User;
  codigo: string = "";
  userInRelation: User;
  codeUserInRelation: string;
  modalRef: NgbModalRef | undefined;
  @ViewChild('eventTemplate') eventTemplate: TemplateRef<any>;

  @ViewChild('viewModal') viewModal: TemplateRef<any>;
  @ViewChild('deleteModal') deleteModal: TemplateRef<any>;
  @ViewChild('createModal') createModal: TemplateRef<any>;
  eventName: string = "";
  nombre: string = "Evento";
  descripcion: string = "Descripcion del evento";
  eventId: string = "Id del evento"
  eventDescription: string = "";
  date: Date;
  newEvents: [];
  newEvento: Events;
  deleteEventTitle: string = "";
  public events: any[] = [];
  idnavision: string = "";
  selectedUser: string = "";
  activeUserRelations: String[] = [];
  relation: string = "";
  selectedUserInRelation: String = "";
  public isEvaluator: boolean;
  dateNgb: NgbDateStruct;
  codeOfEventCreator: string;
  public isCreatorOfEvent: boolean;
  titleModalEdit: string;
  codeAssignForUser: string;
  titleLeyendaSocio:string;
  titleLeyendaEvaluador:string;
  



  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today crearEventoButton',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay'
    },
    customButtons: {
      crearEventoButton: {
        text: 'Añadir Evento',
        click: () => {
          this.onButtonAddClick();
        }
      }
    },
    initialView: 'dayGridMonth'
  };

  currentEvents: Events[] = [];



  constructor(private toastService: ToastrService,private rolService: RolService, private userRelationService: UserRelationService, private apiUser: UserService, private calendarService: CalendarService, private modalService: NgbModal, private changeDetector: ChangeDetectorRef) {
  }

  async ngOnInit() {
    await this.getUserByLogin();
    await this.checkEvaluator();
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today crearEventoButton',
        center: 'title',
        right: 'dayGridMonth,dayGridWeek,dayGridDay'
      },
      customButtons: {
        crearEventoButton: {
          text: 'Añadir Evento',
          click: () => {
            this.onButtonAddClick();
          }
        }
      },
      initialView: 'dayGridMonth',
      weekends: true,
      editable: true,
      events: this.events,
      eventDidMount:(info) => {
        tippy(info.el, {
          content: `
          <h3 class="truncate">Título: ${info.event.title}</h3>
          <p class="truncate">Descripción: ${info.event.extendedProps.description}</p>
        `,
        allowHTML: true,
          arrow: true,
          placement: "top",
          animation: "scale",
          theme: 'material',
        })
      },
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      locale: esLocale,
      eventAllow: this.checkEventAllow.bind(this),
      dateClick: this.onDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDrop: this.onEventDrop.bind(this)
    };
    await this.loadEvents();
    await this.checkOwnEvent();
  };



  public async loadEvents() {
    this.calendarService.getEventsByUser(this.codigo).then((data: any[]) => {
      console.log(data)

      this.calendarOptions.events = this.events = data.map((e: any) => ({
        id: e.id,
        title: e.name,
        start: e.dateStartEvent,
        description: e.description,
        color: e.userId === e.assignByUserId ? 'pink' : 'gray',
        textColor: e.userId === e.assignByUserId ? 'black' : 'white',
        extendedProps: {
          assignbyuser_id: e.userId != e.assignByUserId ? 'Evento asignado' : 'Evento propio',
          codecreator_event: e.userId,
          assignforuser_id: e.assignByUserId
        },
        allDay: true
      }));
      this.changeDetector.detectChanges();
    }).catch(error => {
      console.error('Error al cargar el evento :', error);
    });
  }

  onDateClick(date: { dateStr: Date; }) {
    this.modalRef = this.modalService.open(this.viewModal);
    if (this.modalRef.dismiss) {
      this.eventName = "";
      this.eventDescription = "";
      this.selectedUserInRelation = "";
    }
    this.date = date.dateStr;
  }
  onButtonAddClick() {
    this.modalRef = this.modalService.open(this.createModal);
    if (this.modalRef.dismiss) {
      this.eventName = "";
      this.eventDescription = "";
      this.selectedUserInRelation = "";
    }
  }

  onEventClick(date: { dateStr: Date; }) {
    this.modalRef = this.modalService.open(this.deleteModal);
    this.date = date.dateStr;
  }

  onEventDrop(info) {
    const event = info.event;
    const updatedEvent: Events = {
      id: event.id,
      name: event.title,
      create_date: event.start.toISOString(),
      date_Start_Event: event.start.toISOString(),
      description: event.extendedProps.description,
      assignbyuser_id: event.extendedProps.assignforuser_id,
    };
    const eventId = event.id;
    this.calendarService.updateEvent(eventId, updatedEvent, updatedEvent.assignbyuser_id)
      .then(updatedEvent => {
        this.toastService.success('El evento fue actualizado correctamente', 'Evento Actualizado', {
          timeOut: 2000,
        });
      })
      .catch(error => {
        console.error('Error al actualizar el evento :', error);
      });
  }

  public async createEvent() {
  console.log("Creando el evento "+this.selectedUserInRelation)
    if (this.selectedUserInRelation === null || this.selectedUserInRelation === "") {
      this.codeUserInRelation = this.codigo;
      console.log(this.codeUserInRelation)
    }
    let event: Events = {
      name: this.eventName,
      create_date: this.date,
      date_Start_Event: this.date,
      description: this.eventDescription,
      user_id: this.codigo,
      assignbyuser_id: this.codeUserInRelation
    };
    console.log(event);
    console.log(this.codigo);
    console.log(this.codeUserInRelation)
    await this.calendarService.createEvent(event, this.codigo, this.codeUserInRelation).then((data) => {
      this.toastService.success('El avento ha sido creado correctamente', 'Evento creado', {
        timeOut: 2000,
      });
    })
      .catch((error) => {
        console.log('No se pudo completar la solicitud : ', error);
      });
    this.eventName = "";
    this.eventDescription = "";
    this.modalService.dismissAll();
    this.codeUserInRelation = "";
    this.loadEvents();
  }

  public async createEventButton() {
    const dateConvert: Date = new Date(this.dateNgb.year, this.dateNgb.month - 1, this.dateNgb.day);
    if (this.selectedUserInRelation === null || this.selectedUserInRelation === "") {
      this.codeUserInRelation = this.codigo;
      console.log(this.codeUserInRelation)
    }
    let event: Events = {
      name: this.eventName,
      create_date: dateConvert,
      date_Start_Event: dateConvert,
      description: this.eventDescription,
      user_id: this.codigo,
      assignbyuser_id: this.codeUserInRelation
    };
    console.log(event);
    console.log(this.codigo);
    console.log(this.codeUserInRelation)
    await this.calendarService.createEvent(event, this.codigo, this.codeUserInRelation).then((data) => {
      this.toastService.success('El avento ha sido creado correctamente', 'Evento creado', {
        timeOut: 2000,
      });
    })
      .catch((error) => {
        console.log('No se pudo completar la solicitud : ', error);
      });
    this.eventName = "";
    this.eventDescription = "";
    this.dateNgb = null;
    this.modalService.dismissAll();
    this.codeUserInRelation = "";
    this.loadEvents();
  }

  public async deleteEvent() {
    await this.calendarService.deleteEvent(this.codigo, this.eventId).then((data) => {
      this.toastService.success('El evento se eliminó correctamente', 'Evento Elminado', {
        timeOut: 2000,
      });
    })
      .catch((error) => {
        console.log('No se pudo completar la solicitud : ', error);
      });
    this.modalService.dismissAll();
    this.loadEvents();
  }

  public async updateEvent() {

    //this.selectedUserInRelation = this.activeUserRelations[0];
    console.log("actualizando el evento SelectedUSerIn Relation= "+this.selectedUserInRelation
    +" codeAssignForUser = "+this.codeAssignForUser+" CodeofEventCreator = "+this.codeOfEventCreator+ " codeAssignForUser = "+this.codeAssignForUser);
    if (this.codeUserInRelation === null || this.codeUserInRelation === "") {
      this.codeUserInRelation = this.codigo;
      console.log(this.codeUserInRelation)
      console.log(this.codeAssignForUser)
    }
    if (this.selectedUserInRelation === this.user.login) {
      this.codeUserInRelation = this.codigo;
    }
    if (this.codeUserInRelation === this.codeOfEventCreator){
      console.log("Dentro del else")
      this.codeUserInRelation =this.codeAssignForUser
      console.log(this.codeUserInRelation)
    }
    console.log(this.codeUserInRelation)

    let event: Events = {
      id: this.eventId,
      name: this.nombre,
      create_date: this.date,
      date_Start_Event: this.date,
      description: this.descripcion,
      user_id: this.codigo,
      assignbyuser_id: this.codeUserInRelation
    };
    console.log(event);
    await this.calendarService.updateEvent(this.eventId, event, this.codeUserInRelation).then((data) => {
      this.toastService.success('El evento fue actualizado correctamente', 'Evento Actualizado', {
        timeOut: 2000,
      });
    })
      .catch((error) => {
        console.log('No se pudo completar la solicitud : ', error);
      });
    this.modalService.dismissAll();
    this.loadEvents();
  }

  public async getUserByLogin() {
    try {
      this.user = await this.apiUser.getUserProfileByIdNavision(localStorage.getItem("user_current"));
      await this.getCodeUser();
      console.log(this.user);

    } catch (err) {
      console.error(err);
    }
  }

  public async getCodeUser() {
    try {
      this.codigo = this.user.codigo;
      console.log(this.codigo)
    } catch (err) {
      console.error(err);
    }
    this.changeDetector.detectChanges();
  }

  public async getAllUserInMyRelation() {
    this.activeUserRelations = await this.userRelationService.getActiverRelationsByIdNavision(this.user.login);
    console.log(this.activeUserRelations)
  }

  public onChangeUserRelation(event: Event): void {
    console.log("onChangeUserRelation called");
    const selectElement = event.target as HTMLSelectElement;
    const selectedUser = selectElement.value;
    console.log(selectedUser.toString())
    this.selectedUserInRelation = this.activeUserRelations.find(relation => relation === selectedUser.toString());
    console.log(this.selectedUserInRelation)
    this.apiUser.getUserProfileByIdNavision(this.selectedUserInRelation.toString()).then(
      (response: User) => {
        console.log(response)
        this.userInRelation = response;
        this.codeUserInRelation = this.userInRelation.codigo;

        console.log(this.codeUserInRelation);

      },);
  }

  public async checkEvaluator() {
    const response = await this.rolService.isEvaluador(this.user.codigo);
    this.isEvaluator = Boolean(response);
    if (this.isEvaluator) {
      await this.getAllUserInMyRelation();
      this.titleLeyendaSocio = "Evaluador"
      this.titleLeyendaEvaluador= "Socio"
      this.changeDetector.detectChanges();
    }else{
      this.titleLeyendaSocio = "Socio"
      this.titleLeyendaEvaluador= "Evaluador"
    }
  }
  public async checkOwnEvent() {
    console.log(this.user.codigo)
    console.log(this.codeOfEventCreator)
    if (this.user.codigo = this.codeOfEventCreator) {
      this.isCreatorOfEvent = true;
    } else if (this.isEvaluator) {
      this.isCreatorOfEvent = true;
    } else {
      this.isCreatorOfEvent = false;
    }
  }
  public checkEventAllow(dropInfo, draggedEvent) {
    let creator = draggedEvent.extendedProps.codecreator_event;
    let assign = draggedEvent.extendedProps.assignforuser_id;
    console.log(creator)
    console.log(assign)
    // Determina si el usuario actual es el creador del evento
    let isCurrentUserCreator = (creator === assign);
    // Determina si el usuario actual es el creador del evento arrastrado

    // Si el usuario no es el creador del evento arrastrado, bloquea el desplazamiento
    if (this.isEvaluator) {
      return true;
    }
    if (!isCurrentUserCreator) {
      if (!this.toastMostrado) {
        this.toastService.error('No tienes permisos para modificar este evento', 'Error al modificar el evento', {
          timeOut: 1500,
        });
      }
      return false;
    }else{
      return true;
    }


  }


  public async handleEventClick(clickInfo: EventClickArg) {
    this.nombre = clickInfo.event.title
    this.codeOfEventCreator = clickInfo.event.extendedProps.codecreator_event
    if (this.codigo === this.codeOfEventCreator) {
      this.titleModalEdit = "Editar Evento";
    } else {
      this.titleModalEdit = "Detalles del Evento";
    }

    console.log(this.nombre)
    console.log(this.codeOfEventCreator)
    this.descripcion = clickInfo.event.extendedProps.description
    console.log(this.descripcion)
    this.date = clickInfo.event.start
    this.eventId = clickInfo.event.id
    console.log(this.eventId)
    console.log(this.activeUserRelations)
    this.codeAssignForUser = clickInfo.event.extendedProps.assignforuser_id
    console.log(this.codeAssignForUser)
    console.log("ES evaluador "+this.isEvaluator)
    if (this.isEvaluator) {
      this.userModal = await this.apiUser.getUserByDNI(this.codeAssignForUser)
      console.log(this.userModal)

      this.selectedUserInRelation = this.userModal.login
      console.log(this.selectedUserInRelation)
      console.log(this.codeAssignForUser)
      console.log(this.relation)

    }
    this.modalRef = this.modalService.open(this.deleteModal);

  }
  cancelDialog() {
    this.eventName = "";
    this.eventDescription = "";
    this.modalService.dismissAll();
  }

}

