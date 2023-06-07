import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/user';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { UserService } from 'src/app/services/user-service';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { RolService } from 'src/app/services/rol-service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { SurveyService } from 'src/app/services/survey.service';


@Component({
  selector: 'app-useradmindashboard',
  templateUrl: './useradmindashboard.component.html',
  styleUrls: ['./useradmindashboard.component.css'],

})
export class UseradmindashboardComponent implements OnInit {
  closeResult: string;
  paisUser:string;
  nameUser:String;
  apellido1:String;
  apellido2:String
  puestoUser:String;
  oficinaUser:string;
  users:User [] = [];
  user:User;
  rols:Rol [] = [];
  public formUserCreate:FormGroup;
  public formUserUpdate:FormGroup;
  currentDate = new Date();
  searchText = "";
  listOfContacts:any;
  showPageSizeOptions = true;
  pageEvent: PageEvent;
  page_size :number = 5;
  page_number: number = 1;
  pageSizeOptions = [5, 10, 25];
  rolNameCodeMapper = {
    ADMIN: 1,
    SOCIO: 2,
    EVALUADOR: 3
  }
  socios = [];
  evaluadores = [];
  displayedColumns: string[] = [
    'idNavision',
    'idNavision2',
    'relationCreateDate',
    'active',
  ];
  dataSource: MatTableDataSource<any>;
  relations: any = []

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild('selectBoxSocio') selectBoxSocio: ElementRef;
  @ViewChild('selectBoxEvaluador') selectBoxEvaluador: ElementRef;

  @ViewChild('inputSocioValue') inputSocioValue: ElementRef;
  @ViewChild('inputEvaluadorValue') inputEvaluadorValue: ElementRef;
  
  @ViewChild('inputSearchSocio') inputSearchSocio: ElementRef;
  @ViewChild('inputSearchEvaluador') inputSearchEvaluador: ElementRef;  
 
  @ViewChild('ulOptionsSocio') ulOptionsSocio: ElementRef;
  @ViewChild('ulOptionsEvaluador') ulOptionsEvaluador: ElementRef;

  constructor(private modalService: NgbModal, private userService:UserService,private fb:FormBuilder, private rolService: RolService, private toastService: ToastrService, private surveyService: SurveyService) {

    this.formUserCreate=this.fb.group({
      codigo:[""],
      name:[""],
      apellido1:[""],
      apellido2:[""],
      email:[""],
      login:[""],
      puesto:[""],
      oficina:[""],
      password:[""],
      rolSelect:new FormControl('ADMIN')
    })


    this.formUserUpdate=this.fb.group({
      codigo:[""],
      name:[""],
      apellido1:[""],
      apellido2:[""],
      email:[""],
      login:[""],
      puesto:[""], 
      oficina:[""],
      password:[""],
      rolSelectUpdate:[""],
      denyRolSelected:[""]
    })



  }

  async ngOnInit() {
    this.getAllUsers();
    this.surveyService.getAllUserRelations().then((relations) => {
      console.log(relations)
      this.relations = relations.map(relation => {
        let idNavision = relation.userRelationsPK.idNavision
        let idNavision2 = relation.userRelationsPK.idNavision2
        let {active, relationCreateDate } = relation
        let relationsFormat: any = {
          idNavision,
          idNavision2,
          active,
          relationCreateDate
        }
        return relationsFormat
      })
     
      this.dataSource = new MatTableDataSource<any>(this.relations);
      this.dataSource.paginator = this.paginator;
    });
  }

  async toggleActive(userRelation) {
    await this.surveyService.updateUserRelations(userRelation.idNavision, userRelation.idNavision2)
  }

  toggleSelectBoxSocio() {
    this.selectBoxSocio.nativeElement.classList.toggle('active');
  }

  toggleSelectBoxEvaluador() {
    this.selectBoxEvaluador.nativeElement.classList.toggle('active');
  }

  setInputSocioValue(socio) {
    this.inputSocioValue.nativeElement.value = socio.login;
    this.selectBoxSocio.nativeElement.classList.remove('active');
  }

  setInputEvaluadorValue(evaluador) {
    this.inputEvaluadorValue.nativeElement.value = evaluador.login;
    this.selectBoxEvaluador.nativeElement.classList.remove('active');
  }

  filterSocio() {
    let filter = this.inputSearchSocio.nativeElement.value.toLowerCase();
    let ul = this.ulOptionsSocio.nativeElement;
    let liElements = ul.children;

    for (var i = 0; i < liElements.length; i++) {
      let li = liElements[i];
      let textValue = li.textContent;

      if (textValue.toLowerCase().indexOf(filter) > -1) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  }

  filterEvaluador() {
    let filter = this.inputSearchEvaluador.nativeElement.value.toLowerCase();
    let ul = this.ulOptionsEvaluador.nativeElement;
    let liElements = ul.children;

    for (var i = 0; i < liElements.length; i++) {
      let li = liElements[i];
      let textValue = li.textContent;

      if (textValue.toLowerCase().indexOf(filter) > -1) {
        li.style.display = '';
      } else {
        li.style.display = 'none';
      }
    }
  }

  async assignSocioEvaluador() {
    let idNavision = this.inputSocioValue.nativeElement.value;
    let idNavision2 = this.inputEvaluadorValue.nativeElement.value;
    if (!idNavision || !idNavision2) {
      this.toastService.error('Debes seleccionar a un usuario y un evaluador', 'Asignación inválida', {
        timeOut: 2000,
      });
      return;
    }
    let userRelation = {
      userRelationsPK: {
          "idNavision": idNavision,
          "idNavision2": idNavision2
      },
      active: true,
      personCategory: "2",
      idNavisionIsPT: true,
      idNavision2Name: idNavision2,
      idNavision2Mail: `${idNavision2}@atmira.com`,
      relationCreateDate: new Date(),
      idNavision2IsPT: false,
      idNavisionMail: `${idNavision}@atmira.com`,
      personCategory2: "3",
      idNavisionName: idNavision
  }
  this.toastService.success('La asignación ha sido creada correctamente', 'Asignación válida', {
    timeOut: 2000,
  });
   await this.userService.createUserRelation(userRelation)

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  public async getUserByDNI(codigo:string){
    try{
      this.user=await this.userService.getUserProfileByIdNavision(codigo);
      this.formUserUpdate=this.fb.group({
        codigo:[this.user.codigo],
        name:[this.user.name],
        apellido1:[this.user.apellido1],
        apellido2:[this.user.apellido2],
        puesto:[this.user.puesto],
        oficina:[this.user.oficina],
        login:[this.user.login],
        email:[this.user.email],
        rolSelectUpdate:new FormControl("NO"),
        denyRolSelected:new FormControl("NO")
      });

    }catch(err){
      console.error(err);
    }
  }



  handlePageEvent(e: PageEvent) {
    this.page_size = e.pageSize;
    this.page_number = e.pageIndex +1 ;
  }


  async getAllUsers(){
    this.users= await this.userService.getAllUsers();
    this.users.forEach((user:User) => {
      user.rols.forEach(rol => {
        if (rol.rolname === 'SOCIO') {
          this.socios.push(user)
        }
        if (rol.rolname === 'EVALUADOR') {
          this.evaluadores.push(user)
        }
      })
    })
    this.listOfContacts=this.users
  }


  async deleteUser(codigo:string){
    this.user= await this.userService.deleteKid(codigo);
    await this.ngOnInit();
  }



  public async createUser(){
     let newUser:User = {
       name: this.formUserCreate.get("name").value,
       apellido1: this.formUserCreate.get("apellido1").value,
       apellido2: this.formUserCreate.get("apellido2").value,
       puesto: this.formUserCreate.get("puesto").value,
       oficina: this.formUserCreate.get("oficina").value,
       rols: [],
       events: [],
       turns: [],
       codigo: this.formUserCreate.get("codigo").value,
       pais: "España",
       create_date: this.currentDate,
       email: this.formUserCreate.get("email").value,
       login: this.formUserCreate.get("login").value,
       password: this.formUserCreate.get("password").value,
       profile_Picture: 'https://res.cloudinary.com/dgzlsuwnt/image/upload/v1676912069/profile_fcw78c.jpg'
     }
     let user = await this.userService.createUser(newUser);
     let codigoRol = this.rolNameCodeMapper[this.formUserCreate.get("rolSelect").value]

     await this.rolService.assignRolToUser(user.codigo,codigoRol);
     await this.ngOnInit();
   }


   public async updateUser(){
    console.log(this.user)
    let newUser:User = {
      codigo: this.formUserUpdate.get("codigo").value,
      name: this.formUserUpdate.get("name").value,
      apellido1: this.formUserUpdate.get("apellido1").value,
      apellido2: this.formUserUpdate.get("apellido2").value,
      puesto: this.formUserUpdate.get("puesto").value,
      oficina: this.formUserUpdate.get("oficina").value,
      rols: this.user.rols,
      events: this.user.events,
      turns: this.user.turns,
      pais: this.user.pais,
      create_date: this.user.create_date,
      email: this.formUserUpdate.get("email").value,
      login: this.formUserUpdate.get("login").value,
      password: this.user.password,
      profile_Picture: this.user.profile_Picture
    }
      let user = await this.userService.updateUser(newUser);

      if (this.formUserUpdate.get("rolSelectUpdate").value === "NO" &&
          this.formUserUpdate.get("denyRolSelected").value === "NO") {
            await this.ngOnInit();
            return;
      }
      if (this.formUserUpdate.get("rolSelectUpdate").value === "NO" &&
          this.formUserUpdate.get("denyRolSelected").value !== "NO") {
          let rolRemoved = this.rolNameCodeMapper[this.formUserUpdate.get("denyRolSelected").value]
          await this.rolService.denyRolToUser(user.codigo, rolRemoved);
          await this.ngOnInit();
          return;  
      }
      if (this.formUserUpdate.get("denyRolSelected").value == "NO" &&
          this.formUserUpdate.get("rolSelectUpdate").value !== "NO") {
          let rolUpdated = this.rolNameCodeMapper[this.formUserUpdate.get("rolSelectUpdate").value]
          await this.rolService.assignRolToUser(user.codigo, rolUpdated);
          await this.ngOnInit();
          return;
      }
      if (this.formUserUpdate.get("denyRolSelected").value !== "NO" &&
          this.formUserUpdate.get("rolSelectUpdate").value !== "NO") {
          let rolUpdated = this.rolNameCodeMapper[this.formUserUpdate.get("rolSelectUpdate").value]
          let rolRemoved = this.rolNameCodeMapper[this.formUserUpdate.get("denyRolSelected").value]
          await this.rolService.assignRolToUser(user.codigo, rolUpdated);
          await this.rolService.denyRolToUser(user.codigo, rolRemoved);
          await this.ngOnInit();
          return;
      }
      /*let rolUpdated = this.rolNameCodeMapper[this.formUserUpdate.get("rolSelectUpdate").value]
      let rolRemoved = this.rolNameCodeMapper[this.formUserUpdate.get("denyRolSelected").value]
      
      await this.rolService.assignRolToUser(user.codigo, rolUpdated);
      await this.rolService.denyRolToUser(user.codigo, rolRemoved);*/     
  }



  /**
   * Modal Crear Perfil
   * @param content
   */

  open(content: any) {
    this.modalService.open(content,  { windowClass : "../profile.component.css"}).result.then((result) => {
      this.createUser();
      this.closeResult = `Closed with: ${result}`;
      //window.location.reload();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  public async open2(content: any) {
    this.modalService.open(content,  { windowClass : "../profile.component.css"}).result.then(async (result) => {
      this.closeResult = `Closed with: ${result}`;
      //window.location.reload();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }


  Search(){
     if(this.searchText!== ""){
       let searchValue = this.searchText.toLocaleLowerCase();
       this.listOfContacts = this.users.filter((user:any) =>{
         return user.login.toLocaleLowerCase().match(searchValue) || user.puesto.toLocaleLowerCase().match(searchValue);
        });
           }
           else {
               this.listOfContacts = this.users;
           }
       }

       checkRoleUpdate(rol: string): boolean {
        if (this.user?.rols?.length >=2 ) {
          return true;
        }

        if (rol === 'EVALUADOR' || rol === 'SOCIO') {
          let resultSocio = this.user?.rols.some(role => role.rolname === 'SOCIO');
          let resultEvaluador = this.user?.rols.some(role => role.rolname === 'EVALUADOR');
          if (resultSocio && resultEvaluador) {
            return true
          }
          if (resultEvaluador) {
            return true
          }
          if (resultSocio) {
            return true
          }
          return false
        }
        
        return this.user?.rols.some(role => role.rolname === rol);

      }

      checkRoleDenie(rolName: string) {
        switch(rolName) {
          case 'ADMIN':
            return !this.user?.rols.some(role => role.rolname === rolName)
          case 'EVALUADOR':
            return !this.user?.rols.some(role => role.rolname === rolName)
          case 'SOCIO':
            return !this.user?.rols.some(role => role.rolname === rolName)
        }
      }
}
