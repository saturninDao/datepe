import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Proprietaire } from '../models/proprietaire.model';
import { Salle } from '../models/salle.model';
import { ProprietairesService } from '../services/proprietaires.service';
import { SallesService } from '../services/salles.service';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  sallesSuscriber:Subscription=new Subscription();
  proprioSuscriber:Subscription=new Subscription();
  salles: Salle[];
  proprios: Proprietaire[];
  constructor(
    private sallesService: SallesService,
    private router:Router,
    private propriosService: ProprietairesService
    ) { }

  ngOnInit(): void {
    this.sallesSuscriber = this.sallesService.sallesSubject.subscribe(
      (salles: Salle[])=>{
        this.salles = salles;
        console.log(salles);
      }
    );
    this.sallesService.getSallesForHomePage();
    this.sallesService.emitSalles();
    this.proprioSuscriber = this.propriosService.propriosSubject.subscribe(
      (proprios:Proprietaire[])=>{
        this.proprios = proprios;
        console.log(proprios);
      }
    );
    this.propriosService.getProprios();
    this.propriosService.emitProprios();
  }

  carouselOptions = {
    margin: 25,
    nav: true,
    navText: ["<div class='nav-btn prev-slide'></div>", "<div class='nav-btn next-slide'></div>"],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true
      },
      600: {
        items: 1,
        nav: true
      },
      1000: {
        items: 1,
        nav: true,
        loop: false
      },
      1500: {
        items: 1,
        nav: true,
        loop: true
      }
    }
  }

  images = [
    {
      text: "Everfresh Flowers",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/1.jpg"
    },
    {
      text: "Festive Deer",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/2.jpg"
    },
    {
      text: "Morning Greens",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/3.jpg"
    },
    {
      text: "Bunch of Love",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/4.jpg"
    },
    {
      text: "Blue Clear",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/5.jpg"
    },
    {
      text: "Evening Clouds",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/7.jpg"
    },
    {
      text: "Fontains in Shadows",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/8.jpg"
    },
    {
      text: "Kites in the Sky",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/9.jpg"
    },
    {
      text: "Sun Streak",
      image: "https://freakyjolly.com/demo/jquery/PreloadJS/images/10.jpg"
    }
  ]


  onViewSalle(id:number){
    this.router.navigate(['/salles','view',id]);
  }


}

