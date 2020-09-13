import { Component, OnInit, Type } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms'
import { Router } from '@angular/router';
import { SallesService } from 'src/app/services/salles.service';
import { Salle } from 'src/app/models/salle.model';
import { Proprietaire } from 'src/app/models/proprietaire.model';
import { MesImages } from 'src/app/models/mesimages.model';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-add-salles',
  templateUrl: './add-salles.component.html',
  styleUrls: ['./add-salles.component.css']
})
export class AddSallesComponent implements OnInit {

  salleForm: FormGroup;

  signedUserAdresse: string;
  signedUserEmail: string;
  signedUserNomPrenom: string;
  signedUserNumTel: string;

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

  constructor(private formBuilder: FormBuilder,
              private sallesService: SallesService,
              private router:Router,
              private authService: AuthService
              ) { }

  ngOnInit(): void {
    this.initForm();
    firebase.auth().onAuthStateChanged(
      (user)=>{
        if(user){
          //this.isAuth = true;
          this.signedUserEmail = user.email;
          console.log(user);
        }else{
          //this.isAuth =false;
        }
        //console.log("utilisateur courant "+ firebase.auth().currentUser.displayName);
      }
    )
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
    
      if(this.file1Url && this.file1Url!==''){
        this.image1 = this.file1Url;
      }else{
        this.image1 = this.imageParDefaut;
      }
      if(this.file2Url && this.file2Url!==''){
        this.image2 = this.file2Url;
      }else{
        this.image2 = this.imageParDefaut;
      }
      if(this.file3Url && this.file3Url!==''){
        this.image3 = this.file3Url;
      }else{
        this.image3 = this.imageParDefaut;
      }
      if(this.file4Url && this.file4Url!==''){
        this.image4 = this.file4Url;
      }else{
        this.image4 = this.imageParDefaut;
      }

    const image = new MesImages(this.image1,this.image2,this.image3,this.image4);

    const lieu = this.salleForm.get('lieu').value;
    const nomSalle = this.salleForm.get('nomSalle').value;
    const nombrePlace = this.salleForm.get('nombrePlace').value;
    const prix = this.salleForm.get('prix').value;
    


    const proprio = new Proprietaire('Pas defini','Pas defini',this.signedUserEmail,'Pas defini','Pas defini');
    const type = this.salleForm.get('type').value;
    const newSalle = new Salle(categorie,description,etatSalle,image,lieu,nomSalle,nombrePlace,prix,proprio,type);
    console.log(newSalle);
    this.sallesService.createNewSalle(newSalle);
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
