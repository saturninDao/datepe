import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { ProprietairesService } from 'src/app/services/proprietaires.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SallesService } from 'src/app/services/salles.service';

@Component({
  selector: 'app-single-proprietaire',
  templateUrl: './single-proprietaire.component.html',
  styleUrls: ['./single-proprietaire.component.css']
})
export class SingleProprietaireComponent implements OnInit {

  proprio:Proprietaire;
  idDeLaRoute:number;
  contactProprioForm: FormGroup;

  isEncoursDEnvoie:boolean;
  isMessageEnvoye:boolean;
  
  constructor(private route:ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder,
              private http: HttpClient,
              private proprioService:ProprietairesService) { }

  ngOnInit(): void {
    this.initForm();
   // We create empty book wating for the promise of service to avoid errors
   this.proprio = new Proprietaire('','','','','');
   //We get the id of the book we are about to look at
   let id = this.route.snapshot.params['id'];
   this.idDeLaRoute = parseInt(id);
   this.proprioService.getSingle(+id).then(
     (proprio:Proprietaire)=>{
       this.proprio = proprio;
     }
   );
   
   console.log('sendEmail()');
  }

  onBack(){
    this.router.navigate(['salles']);
  }

  initForm(){
    this.contactProprioForm = this.formBuilder.group({
      name: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      message: ['',[Validators.required]]
    });
  }

  sendEmail() {

    const name = this.contactProprioForm.get('name').value;
    const email = this.contactProprioForm.get('email').value;
    let sujet = 'Prendre contact avec le propriétaire :  '+this.proprio.nomPrenom
    const message = this.contactProprioForm.get('message').value;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
     }


    let dest = this.proprio.email;     
    let messageToSend = '<body><table><tr><td>Nom:</td><td>'+name+'</td></tr><tr><td>Email:</td><td>'+email+'</td></tr><tr><td>Message:</td><td>'+message+'</td></tr></table></body>'
    
     dest = JSON.stringify(dest);
     sujet = JSON.stringify(sujet);
    // messageToSend = JSON.stringify(messageToSend);

    this.isEncoursDEnvoie=true;
    return this.http.get('https://us-central1-projetdatepe.cloudfunctions.net/sendMail?dest='+dest+'&sujet='+sujet+'&message='+messageToSend+'',httpOptions)

                    .toPromise()
                    .then( res => {
                      console.log(res);
                      console.log("Message envoyé!");
                      this.contactProprioForm.reset();
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
