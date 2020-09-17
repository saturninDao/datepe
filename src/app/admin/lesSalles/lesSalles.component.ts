import { Component, OnDestroy, OnInit } from '@angular/core';
import { Salle } from 'src/app/models/salle.model';
import { Subscription } from 'rxjs';
import { SallesService } from 'src/app/services/salles.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { AdminProprioGuardService } from 'src/app/services/admin-proprio-guard.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-salles',
  templateUrl: './lesSalles.component.html',
  styleUrls: ['./lesSalles.component.css']
})
export class LesSallesComponent implements OnInit,OnDestroy {

  salles: Salle[] = [];
  salleSubscriber: Subscription = new Subscription();
  defaultLazyImage = '../../assets/images/chargement.gif';
  signedUserEmail: string;
  isSalleForMe:boolean;
  currentSalle: any;
  currentIndex: number;
  constructor(private sallesService: SallesService, private router: Router, private authService: AuthService,  private adminProprioG:AdminProprioGuardService) { }

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

  removeAllSalles(): void {
    this.sallesService.deleteAll()
      .then(() => this.refreshList())
      .catch(err => console.log(err));
  }



/*
  deleteSalle(): void {
    this.sallesService.delete(this.currentTutorial.key)
      .then(() => {
        //this.refreshList.emit();
        //this.message = 'The tutorial was updated successfully!';
      })
      .catch(err => console.log(err));
  }


*/

























  verifySalleOwner(salle:Salle){
    console.log(this.sallesService.isSalleForMe(salle));
    return this.sallesService.isSalleForMe(salle);

  }




  chargementPourLesProprietaires() {
    this.sallesService.getSallesForAProprio(this.signedUserEmail);
    this.sallesService.emitSalles();
  }

  chargementPourLesAdmins(){
    this.sallesService.getSalles();
   // this.sallesService.emitSalles();
  }

  onNewSalle() {
    this.router.navigate(['/salles', 'new']);
  }

  onDeleteSalle(salle: Salle) {
    this.sallesService.removeSalle(salle);
  }

  onViewSalle(id) {
    this.router.navigate(['/salles', 'view', id]);
  }

  ngOnDestroy() {
    this.salleSubscriber.unsubscribe();
  }

}
