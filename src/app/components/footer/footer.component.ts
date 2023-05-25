import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login-service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  islogged:any;
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
    if(localStorage.getItem("user_current")){
      this.loginService.isLoggedInSubject.next(true);
    }else{
      this.loginService.isLoggedInSubject.next(false);
    }
    this.islogged=this.loginService.isLoggedIn$.subscribe(isLoggedIn => {
      this.islogged=isLoggedIn;
    });
  }

}
