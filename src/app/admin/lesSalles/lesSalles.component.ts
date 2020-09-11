import { Component, OnInit } from '@angular/core';
import { Salle } from 'src/app/models/salle.model';
import { Subscription } from 'rxjs';
import { SallesService } from 'src/app/services/salles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-salles',
  templateUrl: './lesSalles.component.html',
  styleUrls: ['./lesSalles.component.css']
})
export class LesSallesComponent implements OnInit {

  salles: Salle[] = [];
  salleSubscriber: Subscription = new Subscription();
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

  onNewSalle(){
    this.router.navigate(['/salles','new']);
  }
  
  onDeleteSalle(salle:Salle){
    this.sallesService.removeSalle(salle);
  }

 onViewSalle(id:number){
  this.router.navigate(['/salles','view',id]);
}

ngOnDestroy(){
  this.salleSubscriber.unsubscribe();
}

}
