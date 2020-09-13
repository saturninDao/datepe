import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  signedUser: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          this.isAuth = true;
          this.signedUser = user.displayName?user.displayName:user.email;
          console.log(user);
        }else{
          this.isAuth =false;
        }
      }
    )
  }

  signOut(){
    this.authService.signOut();
  }

}
