import { UserService } from './../../services/user-service';
import { LoginService } from '../../services/login-service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { TurnService } from 'src/app/services/turn-service';
import { Turn } from 'src/app/models/turn';
import { RolService } from 'src/app/services/rol-service';

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
  username: string = '';
  office: string = '';

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private turnService: TurnService,
    private rolService:RolService
  ) {}

  ngOnInit(): void {
    this.userService
      .getUserByIdNavision(localStorage.getItem('user_current'))
      .subscribe((user) => {
        this.username = user.name;
        this.office = user.oficina;
      });

      this.rolService.isAdmin('001').subscribe(data => {
        this.isAdmin=data;
      });
  }

  async registerTurn(form) {
    const numberToDay = {
      '0': 'Domingo',
      '1': 'Lunes',
      '2': 'Martes',
      '3': 'Miercoles',
      '4': 'Jueves',
      '5': 'Viernes',
      '6': 'Sabado',
    };
    //
    let updateTurn = await this.turnService.getTurnById(
      this.getWeekYearNumber(new Date())
    );

    if (!updateTurn) {
      let newTurn: Turn = {
        codigo: this.getWeekYearNumber(new Date()),
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
          newTurn.lunes = parseFloat(`${this.time.hour}.${this.time.minute}`);
          newTurn.lunesDescripcion = this.taskDescription;
          break;
        case 'Martes':
          newTurn.martes = parseFloat(`${this.time.hour}.${this.time.minute}`);
          newTurn.martesDescripcion = this.taskDescription;
          break;
        case 'Miercoles':
          newTurn.miercoles = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          newTurn.miercolesDescripcion = this.taskDescription;
          break;
        case 'Jueves':
          newTurn.jueves = parseFloat(`${this.time.hour}.${this.time.minute}`);
          newTurn.juevesDescripcion = this.taskDescription;
          break;
        case 'Viernes':
          newTurn.viernes = parseFloat(`${this.time.hour}.${this.time.minute}`);
          newTurn.viernesDescripcion = this.taskDescription;
          break;
        case 'Sabado':
          newTurn.sabado = parseFloat(`${this.time.hour}.${this.time.minute}`);
          newTurn.sabadoDescripcion = this.taskDescription;
          break;
        case 'Domingo':
          newTurn.domingo = parseFloat(`${this.time.hour}.${this.time.minute}`);
          newTurn.domingoDescripcion = this.taskDescription;
          break;
      }
      this.turnService.saveTurn(newTurn);
    } else {
      switch (numberToDay[new Date().getDay()]) {
        case 'Lunes':
          updateTurn.lunes = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          updateTurn.lunesDescripcion = this.taskDescription;
          break;
        case 'Martes':
          updateTurn.martes = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          updateTurn.martesDescripcion = this.taskDescription;
          break;
        case 'Miercoles':
          updateTurn.miercoles = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          updateTurn.miercolesDescripcion = this.taskDescription;
          break;
        case 'Jueves':
          updateTurn.jueves = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          updateTurn.juevesDescripcion = this.taskDescription;
          break;
        case 'Viernes':
          updateTurn.viernes = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          updateTurn.viernesDescripcion = this.taskDescription;
          break;
        case 'Sabado':
          updateTurn.sabado = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          updateTurn.sabadoDescripcion = this.taskDescription;
          break;
        case 'Domingo':
          updateTurn.domingo = parseFloat(
            `${this.time.hour}.${this.time.minute}`
          );
          updateTurn.domingoDescripcion = this.taskDescription;
          break;
      }

      this.turnService.saveTurn(updateTurn);
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
    this.loginService.deleteToken();
    this.router.navigate(['/login']);
  }
}
