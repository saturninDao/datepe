import { Component, OnInit } from '@angular/core';
import { Salle } from 'src/app/models/salle.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SallesService } from 'src/app/services/salles.service';
import { MesImages } from '../../models/mesimages.model';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import {OwlCarousel} from 'ngx-owl-carousel';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-single-salle',
  templateUrl: './single-salle.component.html',
  styleUrls: ['./single-salle.component.css']
})
export class SingleSalleComponent implements OnInit {
  title = 'owl-carousel';

  //Images = ['../assets/images/image1.jpg','../assets/images/image2.jpg','../assets/images/image1.jpg','../assets/images/image1.jpg'];
  defaultLazyImage = '../../assets/images/chargement.gif';
  iimages:any[];
  mySlideOptions={items: 1, dots: true, nav: true};
  myCarouselOptions={items: 3, dots: true, nav: true};

  salle:Salle;
  lesimages:MesImages;
  leProprietaire:Proprietaire;
  reservationForm: FormGroup;
  isEncoursDEnvoie:boolean;
  isMessageEnvoye:boolean;


  constructor(private route:ActivatedRoute,
              private router:Router,
              private salleService:SallesService,
              private formBuilder: FormBuilder,
              private http: HttpClient) { }

  ngOnInit(): void {
    this.initForm();
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
       this.iimages = [this.salle.image.image1,this.salle.image.image2,this.salle.image.image3,this.salle.image.image4];
       console.log('image list'+this.iimages);
     }
   );
  }

  onBack(){
    this.router.navigate(['salles']);
  }

  initForm(){
    this.reservationForm = this.formBuilder.group({
      nom: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      message: ['',[Validators.required]]
    });
  }

  sendEmail() {

    const nom = this.reservationForm.get('nom').value;
    const email = this.reservationForm.get('email').value;
    let sujet = 'Demande de réservation | Salle '+this.salle.nomSalle;
    const message = this.reservationForm.get('message').value;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
     }


    let dest = this.salle.proprio.email;     
    let messageToSend = '<body><table><tr><td>Nom:</td><td>'+nom+'</td></tr><tr><td>Email:</td><td>'+email+'</td></tr><tr><td>Message:</td><td>'+message+'</td></tr></table></body>'
    
     dest = JSON.stringify(dest);
     sujet = JSON.stringify(sujet);
    // messageToSend = JSON.stringify(messageToSend);

    this.isEncoursDEnvoie=true;
    return this.http.get('https://us-central1-projetdatepe.cloudfunctions.net/sendMail?dest='+dest+'&sujet='+sujet+'&message='+messageToSend+'',httpOptions)

                    .toPromise()
                    .then( res => {
                      console.log(res);
                      console.log("Message envoyé!");
                      this.reservationForm.reset();
                      this.isMessageEnvoye=true;
                      this.isEncoursDEnvoie=false;
                    })
                    .catch(err => {
                      console.log(err)
                      console.log("Message pas envoyé ou envoyé avec des erreurs!");
                      //this.isMessageEnvoye=true;
                      //this.contactForm.reset();
                    })
  }
}
