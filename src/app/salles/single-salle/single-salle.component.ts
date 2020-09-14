import { Component, OnInit } from '@angular/core';
import { Salle } from 'src/app/models/salle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SallesService } from 'src/app/services/salles.service';
import { MesImages } from '../../models/mesimages.model';
import { Proprietaire } from 'src/app/models/proprietaire.model';

@Component({
  selector: 'app-single-salle',
  templateUrl: './single-salle.component.html',
  styleUrls: ['./single-salle.component.css']
})
export class SingleSalleComponent implements OnInit {

  salle:Salle;
  lesimages:MesImages;
  leProprietaire:Proprietaire;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private salleService:SallesService) { }

  ngOnInit(): void {
   // We create empty book wating for the promise of service to avoid errors
   this.lesimages = new MesImages('','','','');
   this.leProprietaire = new Proprietaire('','','','','');
   this.salle = new Salle('','','',this.lesimages,'','',0,0,this.leProprietaire,'');
   //We get the id of the book we are about to look at
   const id = this.route.snapshot.params['id'];
   this.salleService.getSingle(+id).then(
     (salle:Salle)=>{
       this.salle = salle;
       console.log(salle);
     }
   );
  }

  onBack(){
    this.router.navigate(['salles']);
  }
}
