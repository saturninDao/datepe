import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { ProprietairesService } from 'src/app/services/proprietaires.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private proprioService: ProprietairesService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    console.log(firebase.auth.Auth);
  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      prenom: ['',[Validators.required]],
      nom: ['',[Validators.required]],
      numTel: ['',[Validators.required]],
      adresse: ['',[Validators.required]]
    });
  }

  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password  = this.signUpForm.get('password').value;
    const nom = this.signUpForm.get('nom').value;
    const prenom = this.signUpForm.get('prenom').value;
    const numTel = this.signUpForm.get('numTel').value;
    const adresse = this.signUpForm.get('adresse').value;
    const nomPrenom = prenom+' '+nom;

    const newProprietaire = new Proprietaire(adresse,'',email,nomPrenom,numTel);

    

    this.authService.createNewUser(email,password).then(
      ()=> {
        const retourKey = this.proprioService.createNewProprio(newProprietaire);
      // this.router.navigate(['/accueil']);
       console.log(retourKey);
      },
      (error)=> {
        this.errorMessage = error;
      }
    )

}

onSubmitGoogle(){
  const email = this.signUpForm.get('email').value;
  const password  = this.signUpForm.get('password').value;
  this.authService.createNewUserWithGoogle(email,password).then(
    ()=> {
      this.router.navigate(['/accueil']);
    },
    (error)=> {
      this.errorMessage = error;
    }
  )

}


}
