import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase';

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
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    console.log(firebase.auth.Auth);
  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      email: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required,Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmit(){
    const email = this.signUpForm.get('email').value;
    const password  = this.signUpForm.get('password').value;
    this.authService.createNewUser(email,password).then(
      ()=> {
        this.router.navigate(['/accueil']);
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
