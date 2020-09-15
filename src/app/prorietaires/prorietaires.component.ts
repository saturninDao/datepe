import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proprietaire } from '../models/proprietaire.model';
import { ProprietairesService } from '../services/proprietaires.service';
import { SallesService } from '../services/salles.service';

@Component({
  selector: 'app-prorietaires',
  templateUrl: './prorietaires.component.html',
  styleUrls: ['./prorietaires.component.css']
})
export class ProrietairesComponent implements OnInit {

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

  onViewProprio(id:number){
    this.router.navigate(['/proprietaires','view',id]);
  }

  ngOnDestroy(){
    this.proprioSubscriber.unsubscribe();
  }
}
