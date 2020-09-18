import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { ProprietairesService } from 'src/app/services/proprietaires.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit, OnDestroy {

  signUpForm: FormGroup;
  errorMessage: string;
  proprioSuscriber: Subscription = new Subscription();
  proprios: Proprietaire[];
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private proprioService: ProprietairesService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    console.log(firebase.auth.Auth);
    this.proprioSuscriber = this.proprioService.propriosSubject.subscribe(
      (proprios: Proprietaire[]) => {
        this.proprios = proprios;
        console.log(proprios);
      }
    );
    this.proprioService.getProprios();
    this.proprioService.emitProprios();
  }

  initForm() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      prenom: ['', [Validators.required]],
      nom: ['', [Validators.required]],
      numTel: ['', [Validators.required]],
      adresse: ['', [Validators.required]]
    });
  }

  onSubmit() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    const nom = this.signUpForm.get('nom').value;
    const prenom = this.signUpForm.get('prenom').value;
    const numTel = this.signUpForm.get('numTel').value;
    const adresse = this.signUpForm.get('adresse').value;
    const nomPrenom = prenom + ' ' + nom;

    this.authService.createNewUser(email, password).then(
      () => {
        const newProprietaire = new Proprietaire(adresse, '', email, nomPrenom, numTel);
        console.log(newProprietaire);
        //this.proprioService.createNewProprio(newProprietaire);
        this.proprioService.create(newProprietaire);
        this.router.navigate(['/accueil']);
        //console.log(retourKey);
      },
      (error) => {
        this.errorMessage = error;
      }
    )

  }

  onSubmitGoogle() {
    const email = this.signUpForm.get('email').value;
    const password = this.signUpForm.get('password').value;
    this.authService.createNewUserWithGoogle(email, password).then(
      () => {
        this.router.navigate(['/accueil']);
      },
      (error) => {
        this.errorMessage = error;
      }
    )

  }


  ngOnDestroy(): void {
    this.proprioSuscriber.unsubscribe();
  }

}
