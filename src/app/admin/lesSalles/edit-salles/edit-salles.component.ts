import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-salles',
  templateUrl: './edit-salles.component.html',
  styleUrls: ['./edit-salles.component.css']
})
export class EditSallesComponent implements OnInit {

  signUpForm: FormGroup;
  errorMessage: string;
  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.initForm();
    console.log('type');
  }

  initForm(){
    this.signUpForm = this.formBuilder.group({
      type: ['',[Validators.required]],
      nombrePlace: ['',[Validators.required]],
      prix: ['',[Validators.required]],
      lieu: ['',[Validators.required]],
      image: ['',[Validators.required]]
    });
  }


  onAddSalle() {
    const type = this.signUpForm.get('type').value;
    const nombrePlace = this.signUpForm.get('nombrePlace').value;
    const etatSalle = "0";
    const prix = this.signUpForm.get('prix').value;
    const lieu = this.signUpForm.get('lieu').value;
    const image = this.signUpForm.get('image').value;
  }

}
