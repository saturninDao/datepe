import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { ProprietairesService } from 'src/app/services/proprietaires.service';
import { SallesService } from 'src/app/services/salles.service';

@Component({
  selector: 'app-single-proprietaire',
  templateUrl: './single-proprietaire.component.html',
  styleUrls: ['./single-proprietaire.component.css']
})
export class SingleProprietaireComponent implements OnInit {

  proprio:Proprietaire;
  idDeLaRoute:number;
  constructor(private route:ActivatedRoute,
              private router:Router,
              private proprioService:ProprietairesService) { }

  ngOnInit(): void {
   // We create empty book wating for the promise of service to avoid errors
   this.proprio = new Proprietaire('','','','','');
   //We get the id of the book we are about to look at
   let id = this.route.snapshot.params['id'];
   this.idDeLaRoute = parseInt(id);
   this.proprioService.getSingle(+id).then(
     (proprio:Proprietaire)=>{
       this.proprio = proprio;
       console.log(proprio);
     }
   );
  }

  onBack(){
    this.router.navigate(['salles']);
  }

}
