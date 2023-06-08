import { UserService } from './../../services/user-service';
import { LoginService } from '../../services/login-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TurnService } from 'src/app/services/turn-service';
import { RolService } from 'src/app/services/rol-service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  time: NgbTimeStruct;
  hourStep: number = 1;
  minuteStep: number = 15;
  taskDescription: string = '';
  isAdmin:any=true

  updateTurn;
  newTurn;
  refresh:number = 0;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private turnService: TurnService,
    private rolService:RolService,
    private toastService: ToastrService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserProfileByIdNavision(localStorage.getItem('user_current'))
      .then((user) => {
    });
  }
  

  async registerTurn() {
    const numberToDay = {
      '0': 'Domingo',
      '1': 'Lunes',
      '2': 'Martes',
      '3': 'Miercoles',
      '4': 'Jueves',
      '5': 'Viernes',
      '6': 'Sabado',
    };

    try {
      this.updateTurn = await this.turnService.getTurnById(
        `${this.getWeekYearNumber(new Date())}-${localStorage.getItem("user_current")}`
      );
    } catch(error) {
      console.log(error)
    }

    if (!this.updateTurn) {
      this.newTurn = {
        codigo: `${this.getWeekYearNumber(new Date())}-${localStorage.getItem("user_current")}`,
        lunes: 0,
        lunesDescripcion: 'Sin Descripción',
        martes: 0,
        martesDescripcion: 'Sin Descripción',
        miercoles: 0,
        miercolesDescripcion: 'Sin Descripción',
        jueves: 0,
        juevesDescripcion: 'Sin Descripción',
        viernes: 0,
        viernesDescripcion: 'Sin Descripción',
        sabado: 0,
        sabadoDescripcion: 'Sin Descripción',
        domingo: 0,
        domingoDescripcion: 'Sin Descripción',
        semana: new Date(),
        total_Semana: 0,
      };

      switch (numberToDay[new Date().getDay()]) {
        case 'Lunes':
          this.newTurn.lunes = parseFloat(`${this.time.hour}.${this.time.minute}`);
          this.newTurn.lunesDescripcion = this.taskDescription;
          break;
        case 'Martes':
          this.newTurn.martes = parseFloat(`${this.time.hour}.${this.time.minute}`);
          this.newTurn.martesDescripcion = this.taskDescription;
          break;
        case 'Miercoles':
          this.newTurn.miercoles = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          this.newTurn.miercolesDescripcion = this.taskDescription;
          break;
        case 'Jueves':
          this.newTurn.jueves = parseFloat(`${this.time.hour}.${this.time.minute}`);
          this.newTurn.juevesDescripcion = this.taskDescription;
          break;
        case 'Viernes':
          this.newTurn.viernes = parseFloat(`${this.time.hour}.${this.time.minute}`);
          this.newTurn.viernesDescripcion = this.taskDescription;
          break;
        case 'Sabado':
          this.newTurn.sabado = parseFloat(`${this.time.hour}.${this.time.minute}`);
          this.newTurn.sabadoDescripcion = this.taskDescription;
          break;
        case 'Domingo':
          this.newTurn.domingo = parseFloat(`${this.time.hour}.${this.time.minute}`);
          this.newTurn.domingoDescripcion = this.taskDescription;
          break;
      }
      try {
        await this.turnService.saveTurn(this.newTurn);
        this.toastService.success('Su turno ha sido creado correctamente', 'Turnos',  {
          timeOut: 2000,
        });
        this.refresh += 1;
      } catch (error) {
      }
      
      
    } else {
      switch (numberToDay[new Date().getDay()]) {
        case 'Lunes':
          this.updateTurn.lunes = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          this.updateTurn.lunesDescripcion = this.taskDescription;
          break;
        case 'Martes':
          this.updateTurn.martes = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          this.updateTurn.martesDescripcion = this.taskDescription;
          break;
        case 'Miercoles':
          this.updateTurn.miercoles = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          this.updateTurn.miercolesDescripcion = this.taskDescription;
          break;
        case 'Jueves':
          this.updateTurn.jueves = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          this.updateTurn.juevesDescripcion = this.taskDescription;
          break;
        case 'Viernes':
          this.updateTurn.viernes = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          this.updateTurn.viernesDescripcion = this.taskDescription;
          break;
        case 'Sabado':
          this.updateTurn.sabado = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          this.updateTurn.sabadoDescripcion = this.taskDescription;
          break;
        case 'Domingo':
          this.updateTurn.domingo = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          this.updateTurn.domingoDescripcion = this.taskDescription;
          break;
      }
        try {
          await this.turnService.saveTurn(this.updateTurn);  
          this.toastService.success('Su turno ha sido creado correctamente', 'Turnos', {
           timeOut: 2000,
         });
          this.refresh += 1;  
        } catch(error) {
        }
           
    }
  }

  getWeekYearNumber(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const weekNumber = this.getWeekNumber(date);
    return Number(year + '' + weekNumber);
  }

  getWeekNumber(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    let yearStart: any = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    let weekNumber = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    return weekNumber.toString().padStart(2, '0');
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
