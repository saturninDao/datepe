import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, NgForm, FormBuilder } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router';
import { Salle } from 'src/app/models/salle.model';
import { MesImages } from 'src/app/models/mesimages.model';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { SallesService } from 'src/app/services/salles.service';

@Component({
  selector: 'app-edit-salles',
  templateUrl: './edit-salles.component.html',
  styleUrls: ['./edit-salles.component.css']
})
export class EditSallesComponent implements OnInit {

  // les attributs pour afficher la salle a modifier
  salle:Salle;
  lesimages:MesImages;
  leProprietaire:Proprietaire;

  // les attributs pour gerer la modification
  salleFormEdit: FormGroup;
  imageParDefaut = 'https://firebasestorage.googleapis.com/v0/b/booksdao-dfe43.appspot.com/o/images%2F1599587492422sfrDElmh7i%20(3).png?alt=media&token=52e383b6-5aef-461c-841c-55b9b4935034';
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  file1IsUploading: boolean = false;
  file1Url:string;
  file1Uploaded = false;
  file2IsUploading: boolean = false;
  file2Url:string;
  file2Uploaded = false;
  file3IsUploading: boolean = false;
  file3Url:string;
  file3Uploaded = false;
  file4IsUploading: boolean = false;
  file4Url:string;
  file4Uploaded = false;


  constructor(private route:ActivatedRoute,
              private router:Router,
              private formBuilder: FormBuilder,
              private sallesService:SallesService) { }

  ngOnInit(): void {

   // We create empty book wating for the promise of service to avoid errors
   this.lesimages = new MesImages('','','','');
   this.leProprietaire = new Proprietaire('','','','','');
   this.salle = new Salle('','','',this.lesimages,'','',0,0,this.leProprietaire,'');
   //We get the id of the book we are about to look at
   const id = this.route.snapshot.params['id'];
   this.sallesService.getSingle(+id).then(
     (salle:Salle)=>{
       this.salle = salle;
       console.log(salle);
     }
   );
   this.initForm();
  }

  initForm(){

      this.salleFormEdit = this.formBuilder.group({
      categorie: ['',Validators.required],
      description: ['',Validators.required],
      etatSalle: ['',Validators.required],
      lieu: ['',Validators.required],
      nomSalle: ['',Validators.required],
      nombrePlace: ['',Validators.required],
      prix: ['',Validators.required],
      type: ['',Validators.required],
    });
  
    if(!this.salleFormEdit.dirty==true){    
        this.salleFormEdit.get('categorie').setValue(this.salle.categorie);
        this.salleFormEdit.get('description').setValue(this.salle.description);
        this.salleFormEdit.get('etatSalle').setValue(this.salle.etatSalle);
        this.salleFormEdit.get('lieu').setValue(this.salle.lieu);
        this.salleFormEdit.get('nomSalle').setValue(this.salle.nomSalle);
        this.salleFormEdit.get('nombrePlace').setValue(this.salle.nombrePlace);
        this.salleFormEdit.get('prix').setValue(this.salle.prix);
        this.salleFormEdit.get('type').setValue(this.salle.type);
  }
    
  }




  

  onSaveSalle(){
    console.log("HI");
    const categorie = this.salleFormEdit.get('categorie').value;
    const description = this.salleFormEdit.get('description').value;
    const etatSalle = this.salleFormEdit.get('etatSalle').value;
    
      if(this.file1Url && this.file1Url!==''){
        this.image1 = this.file1Url;
      }else{
        this.image1 = this.salle.image.image1;
      }
      if(this.file2Url && this.file2Url!==''){
        this.image2 = this.file2Url;
      }else{
        this.image2 = this.salle.image.image2;
      }
      if(this.file3Url && this.file3Url!==''){
        this.image3 = this.file3Url;
      }else{
        this.image3 = this.salle.image.image3;
      }
      if(this.file4Url && this.file4Url!==''){
        this.image4 = this.file4Url;
      }else{
        this.image4 = this.salle.image.image4;
      }

    const image = new MesImages(this.image1,this.image2,this.image3,this.image4);

    const lieu = this.salleFormEdit.get('lieu').value;
    const nomSalle = this.salleFormEdit.get('nomSalle').value;
    const nombrePlace = this.salleFormEdit.get('nombrePlace').value;
    const prix = this.salleFormEdit.get('prix').value;
    const proprio = new Proprietaire('Pas defini','Pas defini','Pas defini','Pas defini','Pas defini');
    const type = this.salleFormEdit.get('type').value;
    const newSalle = new Salle(categorie,description,etatSalle,image,lieu,nomSalle,nombrePlace,prix,proprio,type);
    console.log(newSalle);
    const id = this.route.snapshot.params['id'];
    console.log("le id de la salle a modifier "+ id)
    //this.sallesService.updateSalle(id,newSalle);
    this.sallesService.update(this.salle.key, newSalle)
    .then(() => console.log('update ok'))
    .catch(err => console.log(err));
    this.router.navigate(['admin/lessalles']);
  }

  onUploadFile1(file:File){
    this.file1IsUploading = true;
    this.sallesService.uploadFile(file).then(
      (url:string)=>{
        this.file1Url = url;
        this.file1IsUploading = false;
        this.file1Uploaded = true;}
    )
  }
  onUploadFile2(file:File){
    this.file2IsUploading = true;
    this.sallesService.uploadFile(file).then(
      (url:string)=>{
        this.file2Url = url;
        this.file2IsUploading = false;
        this.file2Uploaded = true;}
    )
  }
  onUploadFile3(file:File){
    this.file3IsUploading = true;
    this.sallesService.uploadFile(file).then(
      (url:string)=>{
        this.file3Url = url;
        this.file3IsUploading = false;
        this.file3Uploaded = true;}
    )
  }
  onUploadFile4(file:File){
    this.file4IsUploading = true;
    this.sallesService.uploadFile(file).then(
      (url:string)=>{
        this.file4Url = url;
        this.file4IsUploading = false;
        this.file4Uploaded = true;}
    )
  }
  detectFiles1(event){
    this.onUploadFile1(event.target.files[0]);
  }
  detectFiles2(event){
    this.onUploadFile2(event.target.files[0]);
  }
  detectFiles3(event){
    this.onUploadFile3(event.target.files[0]);
  }
  detectFiles4(event){
    this.onUploadFile4(event.target.files[0]);
  }

}
