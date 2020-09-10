import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { SallesService } from 'src/app/services/salles.service';
import { Salle } from 'src/app/models/salle.model';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { MesImages } from 'src/app/models/mesimages.model';

@Component({
  selector: 'app-add-salles',
  templateUrl: './add-salles.component.html',
  styleUrls: ['./add-salles.component.css']
})
export class AddSallesComponent implements OnInit {

  salleForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private sallesService: SallesService,
              private router:Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(){
    this.salleForm = this.formBuilder.group({
      categorie: ['',Validators.required],
      description: ['',Validators.required],
      etatSalle: ['',Validators.required],
      lieu: ['',Validators.required],
      nomSalle: ['',Validators.required],
      nombrePlace: ['',Validators.required],
      prix: ['',Validators.required],
      type: ['',Validators.required],

    });
  }

  onSaveSalle(){
    const categorie = this.salleForm.get('categorie').value;
    const description = this.salleForm.get('description').value;
    const etatSalle = this.salleForm.get('etatSalle').value;
    const image = new MesImages(
      'https://firebasestorage.googleapis.com/v0/b/booksdao-dfe43.appspot.com/o/images%2F1599587492422sfrDElmh7i%20(3).png?alt=media&token=52e383b6-5aef-461c-841c-55b9b4935034',
      'https://firebasestorage.googleapis.com/v0/b/booksdao-dfe43.appspot.com/o/images%2F1599587492422sfrDElmh7i%20(3).png?alt=media&token=52e383b6-5aef-461c-841c-55b9b4935034',
      'https://firebasestorage.googleapis.com/v0/b/booksdao-dfe43.appspot.com/o/images%2F1599587492422sfrDElmh7i%20(3).png?alt=media&token=52e383b6-5aef-461c-841c-55b9b4935034',
      'https://firebasestorage.googleapis.com/v0/b/booksdao-dfe43.appspot.com/o/images%2F1599587492422sfrDElmh7i%20(3).png?alt=media&token=52e383b6-5aef-461c-841c-55b9b4935034');
    const lieu = this.salleForm.get('lieu').value;
    const nomSalle = this.salleForm.get('nomSalle').value;
    const nombrePlace = this.salleForm.get('nombrePlace').value;
    const prix = this.salleForm.get('prix').value;
    const proprio = new Proprietaire('Pas defini','Pas defini','Pas defini','Pas defini','Pas defini');
    const type = this.salleForm.get('type').value;
    const newSalle = new Salle(categorie,description,etatSalle,image,lieu,nomSalle,nombrePlace,prix,proprio,type);
    console.log(newSalle);
    this.sallesService.createNewSalle(newSalle);
    this.router.navigate(['admin/lessalles']);
  }
  

}
