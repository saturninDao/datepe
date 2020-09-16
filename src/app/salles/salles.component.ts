import { Component, OnInit, OnDestroy } from '@angular/core';
import { Salle } from '../models/salle.model';
import { Subscription } from 'rxjs';
import { SallesService } from '../services/salles.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit,OnDestroy {
  salles: Salle[] = [];
  salleSubscriber: Subscription = new Subscription();
  defaultLazyImage = '../../assets/images/chargement.gif';

  constructor(private sallesService: SallesService, private router: Router) { }

  ngOnInit(): void {
    this.salleSubscriber = this.sallesService.sallesSubject.subscribe(
      (salles: Salle[])=>{
        this.salles = salles;
        console.log(salles);
      }
    );
    this.sallesService.getSalles();
    this.sallesService.emitSalles();
  }

  onViewSalle(id:number){
    this.router.navigate(['/salles','view',id]);
  }

  ngOnDestroy(){
    this.salleSubscriber.unsubscribe();
  }
}
