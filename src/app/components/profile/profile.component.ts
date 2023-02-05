import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  user:User;


  constructor(private apiUser:UserService) { }

  ngOnInit(): void {
    this.getUserByDNI();
  }



  public async getUserByDNI(){
    try{
      this.user=await this.apiUser.getUserByDNI('753485H');
      console.log(this.user);

    }catch(err){
      console.error(err);
    }
  }


}
