import { Component, OnDestroy, OnInit } from '@angular/core';
import { Salle } from 'src/app/models/salle.model';
import { Subscription } from 'rxjs';
import { SallesService } from 'src/app/services/salles.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { AuthService } from 'src/app/services/auth.service';
import { AdminProprioGuardService } from 'src/app/services/admin-proprio-guard.service';

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
  constructor(private sallesService: SallesService, private router: Router, private authService: AuthService,  private adminProprioG:AdminProprioGuardService) { }

  ngOnInit(): void {



    this.authService.whoIsConnected().then(
      (resolve: string) => {
        this.signedUserEmail = resolve;
        console.log(this.signedUserEmail);
      }
    )



    this.salleSubscriber = this.sallesService.sallesSubject.subscribe(
      (salles: Salle[]) => {
        this.salles = salles;
        console.log(salles);
      }
    );

    this.adminProprioG.isAdmin().then((resolve)=>{
        if(resolve==false){
          this.chargementPourLesProprietaires();
        }else{
          this.chargementPourLesAdmins();
        }
    });
  }

  chargementPourLesProprietaires() {
    this.sallesService.getSallesForAProprio(this.signedUserEmail);
    this.sallesService.emitSalles();
  }

  chargementPourLesAdmins(){
    this.sallesService.getSalles();
    this.sallesService.emitSalles();
  }

  onNewSalle() {
    this.router.navigate(['/salles', 'new']);
  }

  onDeleteSalle(salle: Salle) {
    this.sallesService.removeSalle(salle);
  }

  onViewSalle(id: number) {
    this.router.navigate(['/salles', 'view', id]);
  }

  ngOnDestroy() {
    this.salleSubscriber.unsubscribe();
  }

}
