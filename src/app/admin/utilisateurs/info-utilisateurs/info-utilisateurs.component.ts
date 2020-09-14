import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-info-utilisateurs',
  templateUrl: './info-utilisateurs.component.html',
  styleUrls: ['./info-utilisateurs.component.css']
})
export class InfoUtilisateursComponent implements OnInit {


  constructor(private router: Router) { }

  ngOnInit(): void {
  
  }


}
