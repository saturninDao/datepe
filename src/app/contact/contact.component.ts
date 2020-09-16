import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http"; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {

  errorMessage: string;
  isMessageEnvoye: boolean;
  isEncoursDEnvoie: boolean;
  contactForm: FormGroup;

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder
    ) { }
    
  ngOnInit(): void {

    this.initForm();

  }

  initForm(){
    this.contactForm = this.formBuilder.group({
      nom: ['',[Validators.required]],
      tel: ['',[Validators.required]],
      email: ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      sujet: ['',[Validators.required]],
      message: ['',[Validators.required]]
    });
  }

  sendEmail() {
    let url = 'https://us-central1-projetdatepe.cloudfunctions.net/sendMail'
    
    let params: URLSearchParams = new URLSearchParams();
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });

    const nom = this.contactForm.get('nom').value;
    const tel = this.contactForm.get('tel').value;
    const email = this.contactForm.get('email').value;
    let sujet = this.contactForm.get('sujet').value;
    const message = this.contactForm.get('message').value;

    params.set('dest', 'tda92212@gmail.com');
    let dest = 'tda92212@gmail.com';
    params.set('sujet', nom+'<'+email+'> | '+tel+' | '+sujet);
    params.set('message', message);
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
     };

    let messageToSend = '<body><table><tr><td>Nom:</td><td>'+nom+'</td></tr><tr><td>Telephone:</td><td>'+tel+'</td></tr><tr><td>Email:</td><td>'+email+'</td></tr><tr><td>Message:</td><td>'+message+'</td></tr></table></body>'
    
     dest = JSON.stringify(dest);
     sujet = JSON.stringify(sujet);
     messageToSend = JSON.stringify(messageToSend);

    this.isEncoursDEnvoie=true;
    return this.http.get('https://us-central1-projetdatepe.cloudfunctions.net/sendMail?dest='+dest+'&sujet='+sujet+'&message='+messageToSend+'',httpOptions)

                    .toPromise()
                    .then( res => {
                      console.log(res);
                      console.log("Message envoyé!");
                      this.contactForm.reset();
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
