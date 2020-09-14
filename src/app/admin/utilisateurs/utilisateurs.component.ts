import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
 // users: User[];

  constructor(private router: Router) { }

  ngOnInit(): void {
  
  }
//  infoUser(user: User): void {
 //   window.localStorage.removeItem("editUserId");
    //window.localStorage.setItem("editUserId", user.id.toString());
 //   this.router.navigate(['edit-user']);
  //};
}
