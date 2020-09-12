import { Injectable } from '@angular/core';
import { Salle } from '../models/salle.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class SallesService {

  salles: Salle[] = [];
  sallesSubject = new Subject<Salle[]>();
  constructor() { }

  emitSalles(){
    this.sallesSubject.next(this.salles);
  }

  saveSalles(){
    firebase.database().ref('/salles').set(this.salles);
  }

  getSalles(){
    firebase.database().ref('/salles')
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
