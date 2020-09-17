import { Injectable } from '@angular/core';
import { Salle } from '../models/salle.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SallesService {

  salles: Salle[] = [];
  signedUser: string;
  sallesSubject = new Subject<Salle[]>();
  constructor(private authService: AuthService) { }

  emitSalles(){
    this.sallesSubject.next(this.salles);
  }

  saveSalles(){
    firebase.database().ref('/salles').set(this.salles);
  }

  updateSalle(id,salleToModify:Salle){
    firebase.database().ref('/salles/'+id).set(salleToModify);
  }

  getSalles(){
    firebase.database().ref('/salles')
      .on('value',(data)=>{
        this.salles = data.val()?data.val():[];
        this.emitSalles();
      })
  }

  getSallesForAProprio(email):Salle[]{
    this.authService.whoIsConnected().then((resolve:string)=>{
      this.signedUser=resolve;
    })
    let sallesDuProprio: Salle[]=[];
    firebase.database().ref('/salles')
      .on('value',(data)=>{
        this.salles = data.val()?data.val():[];
        console.log(this.salles);

        const proprioIndexToReturn = this.salles.findIndex(
          (salle)=>{
            console.log(salle);
            console.log(this.signedUser);
            if(salle.proprio.email==this.signedUser){
              //return true;
              sallesDuProprio.push(salle);
              console.log(sallesDuProprio);
              this.salles = sallesDuProprio;
              this.emitSalles();
            }else{
              this.salles = [];
            }
          }
        )
      })
      this.emitSalles();
      return sallesDuProprio;
  }


  getSallesForHomePage(){
    firebase.database().ref('/salles')
      .limitToFirst(3)
      .on('value',(data)=>{
        this.salles = data.val()?data.val():[];
        this.emitSalles();
      })
  }

  getSingle(id){
    return new Promise(
      (resolve,reject)=>{
        firebase.database().ref('/salles/'+id).once('value').then(
          (data) => {
            resolve(data.val());
          },
          (error) => {
            reject(error);
          }
        )
      }
    )
  }

  createNewSalle(newSalle: Salle) {
    this.salles.push(newSalle);
    this.saveSalles();
    this.emitSalles();
  }

  removeSalle(salle: Salle){
    const salleIndexToRemove = this.salles.findIndex(
      (salleEl)=>{
        if(salleEl==salle){
          return true;
        }
      }
    )
    this.salles.splice(salleIndexToRemove, 1);
    this.saveSalles();
    this.emitSalles();
  }
  
  uploadFile(file:File){
    return new Promise(
      (resolve,reject)=>{
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
        .child('images/'+almostUniqueFileName+file.name)
        .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          ()=>{
            console.log('chargement en cours...')
          },
          (error)=>{
            console.log('Erreur de chargement' + error);
            reject(error)
          },
          ()=>{
            resolve(upload.snapshot.ref.getDownloadURL());
          }
          )
      }
    )
  }


}
