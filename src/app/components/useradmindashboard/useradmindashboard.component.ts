import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbTypeaheadModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { Rol } from 'src/app/models/rol';
import { User } from 'src/app/models/user';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import { UserService } from 'src/app/services/user-service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';


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

  constructor(private modalService: NgbModal, private userService:UserService,private fb:FormBuilder) {

    this.formUserCreate=this.fb.group({
      codigo:[""],
      name:[""],
      apellido1:[""],
      apellido2:[""],
      email:[""],
      login:[""],
      puesto:[""],
      oficina:[""],
      password:[""]
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
      password:[""]
    })



  }

 async ngOnInit() {
    this.getAllUsers();

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
    this.listOfContacts=this.users
    console.log(this.users);

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
     await this.userService.createUser(newUser);
     await this.ngOnInit();
   }


   public async updateUser(){
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

      await this.userService.updateUser(newUser);
      await this.ngOnInit();
  }



  /**
   * Modal Crear Perfil
   * @param content
   */

  open(content: any) {
    this.modalService.open(content,  { windowClass : "./profile.component.css"}).result.then((result) => {
      this.createUser();
      this.closeResult = `Closed with: ${result}`;

      //window.location.reload();
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  public async open2(content: any) {
    this.modalService.open(content,  { windowClass : "./profile.component.css"}).result.then(async (result) => {
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

}
