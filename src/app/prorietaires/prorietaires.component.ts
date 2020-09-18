import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proprietaire } from '../models/proprietaire.model';
import { ProprietairesService } from '../services/proprietaires.service';
import { SallesService } from '../services/salles.service';

@Component({
  selector: 'app-prorietaires',
  templateUrl: './prorietaires.component.html',
  styleUrls: ['./prorietaires.component.css']
})
export class ProrietairesComponent implements OnInit,OnDestroy {

  proprios: Proprietaire[] = [];
  proprioSubscriber: Subscription = new Subscription();
  currentSalle: any;
  currentIndex: any;
  constructor(private proprioService: ProprietairesService, private router: Router) { }

  ngOnInit(): void {
    this.retrieveProprios();
  }


  refreshList(): void {
    this.currentSalle = null;
    this.currentIndex = -1;
    this.retrieveProprios();
  }

  retrieveProprios(): void {
    this.proprioService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.proprios = data;
    });
  }

  setActiveProprio(salle, index): void {
    this.currentSalle = salle;
    this.currentIndex = index;
  }

  removeAllProprios(): void {
    this.proprioService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }

  /**********/

  onViewProprio(id:number){
    this.router.navigate(['/proprietaires','view',id]);
  }

  ngOnDestroy(){
    this.proprioSubscriber.unsubscribe();
  }
}
