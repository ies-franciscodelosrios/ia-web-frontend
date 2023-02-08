import { Component, OnInit } from '@angular/core';
import { Event } from '../../models/event';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  user:User;
  nameUser:String;
  apellido1:String;
  apellido2:String
  puestoUser:String;
  oficinaUser:string;
  paisUser:string;
  urlImage:string;
  events: number
  teamManagerNumber:number
  teamManagerNames:String[]=[]
  closeResult: string;
  public formUser:FormGroup; //Formulario



  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';



  constructor(private apiUser:UserService,private modalService: NgbModal,private fb:FormBuilder) {

    this.formUser=this.fb.group({
      name:["",Validators.required],
      apellido1:["",Validators.required],
      apellido2:["",Validators.required],
      puesto:["",Validators.required],
      oficina:["",Validators.required]
    })


  }


  async ionViewDidEnter(){


  }

  async ngOnInit() {
    await this.getUserByDNI();

    this.formUser=this.fb.group({
      name:[this.nameUser],
      apellido1:[this.apellido1],
      apellido2:[this.apellido2],
      puesto:[this.puestoUser],
      oficina:[this.oficinaUser]

    });

  }



  public async getUserByDNI(){
    try{
      this.user=await this.apiUser.getUserProfileByIdNavision(localStorage.getItem("user_current"));
      await this.getDataUser();
      await this.getEvents();
      await this.getTeamManager();
      await this.getNameTeamManager();
    }catch(err){
      console.error(err);
    }
  }

  public async getDataUser(){
    try {
      this.apellido1=this.user.apellido1;
      this.apellido2=this.user.apellido2
      this.nameUser= this.user.name;
      this.puestoUser=this.user.puesto;
      this.oficinaUser=this.user.oficina;
      this.paisUser=this.user.pais;
      this.urlImage=this.user.profile_Picture
    } catch (err) {
      console.error(err);
    }

  }


  public async getEvents(){
    try {
      let event:Event[]=await this.apiUser.getUserEvents(this.user.codigo);
      this.events= event.length;
        return this.events;
    } catch (err) {
      console.error(err);
      return err;
    }
  }

  public async getTeamManager(){
    try {
      this.teamManagerNumber=await this.apiUser.getTeamManagerByUser(this.user.login);
      return this.teamManagerNumber;
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  public async getNameTeamManager(){
    try {

      let nameTM:String[]=await this.apiUser.getNameTeamManagerByUser(this.user.login);
      this.teamManagerNames=nameTM;
      console.log(this.teamManagerNames);
      return this.teamManagerNumber;
    } catch (err) {
      console.log(err);
      return err;
    }
  }


  public async updateUser(){
    let newUser:User = {
      name: this.formUser.get("name").value,
      apellido1: this.formUser.get("apellido1").value,
      apellido2: this.formUser.get("apellido2").value,
      puesto: this.formUser.get("puesto").value,
      oficina: this.formUser.get("oficina").value,
      rols: this.user.rols,
      events: this.user.events,
      turns: this.user.turns,
      codigo: this.user.codigo,
      pais: this.paisUser,
      create_date: this.user.create_date,
      email: this.user.email,
      login: this.user.login,
      password: this.user.password,
      profile_Picture:this.urlImage
    }

    try {
      this.apiUser.updateUser(newUser);
      console.log('USER ACTUALIZADO');

    } catch (err) {
      console.log(err);

    }
  }



  qselectFile(event: any):void {
    this.selectedFiles = event.target.files;
    this.upload();
  }


  upload(): void {
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.apiUser.upload(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
      }

      this.selectedFiles = undefined;
    }
  }




  /**
   * Modal Editar Perfil
   * @param content
   */

  open(content: any) {
    this.modalService.open(content,  { windowClass : "./profile.component.css"}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      this.updateUser();
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


}
