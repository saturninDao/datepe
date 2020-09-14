import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Subscription } from 'rxjs';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { ProprietairesService } from 'src/app/services/proprietaires.service';


@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit {
 
  proprios: Proprietaire[] = [];
  proprioSubscriber: Subscription = new Subscription();
  constructor(private proprioService: ProprietairesService, private router: Router) { }

  ngOnInit(): void {
    this.proprioSubscriber = this.proprioService.propriosSubject.subscribe(
      (proprios: Proprietaire[])=>{
        this.proprios = proprios;
        console.log(proprios);
      }
    );
    this.proprioService.getProprios();
    this.proprioService.emitProprios();
  }

  onViewSalle(id:number){
    this.router.navigate(['/salles','view',id]);
  }

  ngOnDestroy(){
    this.proprioSubscriber.unsubscribe();
  }

}
