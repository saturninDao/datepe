import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Proprietaire } from '../models/proprietaire.model';

@Injectable({
  providedIn: 'root'
})

export class ProprietairesService {

  prorietaires: Proprietaire[] = [];
  propriosSubject = new Subject<Proprietaire[]>();
  constructor() { }

  emitProprios(){
    this.propriosSubject.next(this.prorietaires);
  }

  saveProprios(){
    firebase.database().ref('/utilisateurs/').set(this.prorietaires);
  }

  updateProprio(id,proprioTOmodify:Proprietaire){
    firebase.database().ref('/utilisateurs/'+id).set(proprioTOmodify);
  }

  getProprios(){
    firebase.database().ref('/utilisateurs')
      .on('value',(data)=>{
        this.prorietaires = data.val()?data.val():[];
        this.emitProprios();
      })
  }

  getSingle(id){
    return new Promise(
      (resolve,reject)=>{
        firebase.database().ref('/utilisateurs/'+id).once('value').then(
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
/*
  getUserDataByEmail(email){
    return new Promise(
      (resolve,reject)=>{
        firebase.database().ref('/utilisateurs/')
         .orderByKey().equalTo('0').on("child_added", (snap) => {
          console.log(snap.val());
      });
      })
    }*/

    users = firebase.database().ref('/utilisateurs');

    getUserDataByEmail(email){
      let leproprioEl = new Proprietaire('','','','','');
      console.log("hryyyyyyyyyyyyyyyyyyyyyyyyyy");
      const proprioIndexToReturn = this.prorietaires.findIndex(
        (proprioEl)=>{
          console.log(proprioEl);
          console.log(email);
          if(proprioEl.email==email){
            //return true;
            leproprioEl = proprioEl;
            
          }
        }
      )
      this.emitProprios();
      return leproprioEl;

    }

  createNewProprio(newProprio: Proprietaire) {
    this.prorietaires.push(newProprio);
    this.saveProprios();
    this.emitProprios();
    return this.prorietaires.length-1;
  }

  removeProrio(proprio: Proprietaire){
    const proprioIndexToRemove = this.prorietaires.findIndex(
      (proprioEl)=>{
        if(proprioEl==proprio){
          return true;
        }
      }
    )
    this.prorietaires.splice(proprioIndexToRemove, 1);
    this.saveProprios();
    this.emitProprios();
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
