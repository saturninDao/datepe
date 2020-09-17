import { Component, OnInit, OnDestroy } from '@angular/core';
import { Salle } from '../models/salle.model';
import { Subscription } from 'rxjs';
import { SallesService } from '../services/salles.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-salles',
  templateUrl: './salles.component.html',
  styleUrls: ['./salles.component.css']
})
export class SallesComponent implements OnInit,OnDestroy {
  salles: Salle[] = [];
  salleSubscriber: Subscription = new Subscription();
  defaultLazyImage = '../../assets/images/chargement.gif';

  currentSalle: any;
  currentIndex: number;
  constructor(private sallesService: SallesService, private router: Router) { }

  ngOnInit(): void {
      this.retrieveSalles();
  }



  refreshList(): void {
    this.currentSalle = null;
    this.currentIndex = -1;
    this.retrieveSalles();
  }

  retrieveSalles(): void {
    this.sallesService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.salles = data;
    });
  }

  setActiveSalle(salle, index): void {
    this.currentSalle = salle;
    this.currentIndex = index;
  }











  onViewSalle(id:number){
    this.router.navigate(['/salles','view',id]);
  }

  ngOnDestroy(){
    this.salleSubscriber.unsubscribe();
  }
}
