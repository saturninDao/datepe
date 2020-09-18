import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { ProprietairesService } from 'src/app/services/proprietaires.service';


@Component({
  selector: 'app-utilisateurs',
  templateUrl: './utilisateurs.component.html',
  styleUrls: ['./utilisateurs.component.css']
})
export class UtilisateursComponent implements OnInit, OnDestroy {

  proprios: Proprietaire[] = [];
  proprioSubscriber: Subscription = new Subscription();
  currentSalle: any;
  currentIndex: number;

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

  setActiveSalle(salle, index): void {
    this.currentSalle = salle;
    this.currentIndex = index;
  }

  removeAllSalles(): void {
    this.proprioService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }
  
   /*********************/
  onViewProprio(id: number) {
    this.router.navigate(['/proprietaires', 'view', id]);
  }

  ngOnDestroy() {
    this.proprioSubscriber.unsubscribe();
  }

}
