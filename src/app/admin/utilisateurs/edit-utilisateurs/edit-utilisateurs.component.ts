import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { ProprietairesService } from 'src/app/services/proprietaires.service';

@Component({
  selector: 'app-edit-utilisateurs',
  templateUrl: './edit-utilisateurs.component.html',
  styleUrls: ['./edit-utilisateurs.component.css']
})

export class EditUtilisateursComponent implements OnInit {
  proprio: Proprietaire;
  editUserForm: FormGroup;
  nom: string;
  prenom: string;
  constructor(private route:ActivatedRoute,
    private router:Router,
    private formBuilder: FormBuilder,
    private proprioService:ProprietairesService) { }

ngOnInit(): void {

// We create empty book wating for the promise of service to avoid errors
this.proprio = new Proprietaire('','','','','');
//We get the id of the book we are about to look at
const id = this.route.snapshot.params['id'];
this.proprioService.getSingle(+id).then(
(proprio:Proprietaire)=>{
this.proprio = proprio;
const tabNP = this.proprio.nomPrenom.split(' ',2);
this.nom = tabNP[1];
this.prenom = tabNP[0];
console.log(proprio);
}
);
this.initForm();
}

initForm(){


this.editUserForm = this.formBuilder.group({
prenom: ['',Validators.required],
nom: ['',Validators.required],
numTel: ['',Validators.required],
adresse: ['',Validators.required],
description: new FormControl()
});





if(!this.editUserForm.dirty==true){    
this.editUserForm.get('nom').setValue(this.nom);
this.editUserForm.get('prenom').setValue(this.prenom);
this.editUserForm.get('numTel').setValue(this.proprio.numTel);
this.editUserForm.get('adresse').setValue(this.proprio.adresse);
this.editUserForm.get('description').setValue(this.proprio.description);

}
}

onSaveUser(){
console.log("HI");
const nom = this.editUserForm.get('nom').value;
const prenom = this.editUserForm.get('prenom').value;
const nomPrenom = prenom+' '+nom;
const email = this.proprio.email;
const numTel = this.editUserForm.get('numTel').value;
const adresse = this.editUserForm.get('adresse').value;
const description = this.editUserForm.get('description').value;

console.log(this.proprio);
const newProprio = new Proprietaire(adresse,description,email,nomPrenom,numTel);

console.log(newProprio);
const id = this.route.snapshot.params['id'];
console.log("le id de la salle a modifier "+ id)
this.proprioService.updateProprio(id,newProprio);
this.router.navigate(['admin/utilisateurs']);
}

}
