import { Component, OnInit } from '@angular/core';
import { Salle } from 'src/app/models/salle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SallesService } from 'src/app/services/salles.service';
import { MesImages } from '../../models/mesimages.model';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import {OwlCarousel} from 'ngx-owl-carousel';

@Component({
  selector: 'app-single-salle',
  templateUrl: './single-salle.component.html',
  styleUrls: ['./single-salle.component.css']
})

export class SingleSalleComponent implements OnInit {
  title = 'owl-carousel';

  //Images = ['../assets/images/image1.jpg','../assets/images/image2.jpg','../assets/images/image1.jpg','../assets/images/image1.jpg'];
 iimages:any[];
mySlideOptions={items: 1, dots: true, nav: true};
myCarouselOptions={items: 3, dots: true, nav: true};

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
   //this.salleService.ge
   this.salleService.getSingle(+id).then(
     (salle:Salle)=>{
       this.salle = salle;
       console.log(salle);
       this.iimages = [this.salle.image.image1,this.salle.image.image2,this.salle.image.image3,this.salle.image.image4];
       console.log('image list'+this.iimages);
     }

   );

  
   //$(window).click(function () {
   // alert('JQuery est installé');
  //});






  }

  onBack(){
    this.router.navigate(['salles']);
  }
}


