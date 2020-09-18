import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Proprietaire } from '../models/proprietaire.model';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProprietairesService {

  private dbPath = '/utilisateurs2';
  usersRef: AngularFireList<Proprietaire> = null;

  prorietaires: Proprietaire[] = [];
  propriosSubject = new Subject<Proprietaire[]>();

  constructor(private db: AngularFireDatabase) {
    this.usersRef = db.list(this.dbPath);
   }

  getAll(): AngularFireList<Proprietaire> {
    return this.usersRef;
  }

  create(proprio: Proprietaire): any {
    return this.usersRef.push(proprio);
  }

  update(key: string, value: any): Promise<void> {
    return this.usersRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.usersRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.usersRef.remove();
  }

  getOne(key){
    return this.db.object('/utilisateurs2/'+key);
  }

  getProprioByEmail(email:string){
/*
    let leKeyARetourner;
    this.db.list('/utilisateurs2').query.orderByChild('email').equalTo('daomag30@yahoo.com').on("child_added", function(snapshot) {
      console.log(snapshot.key + " was " + snapshot.val());
      leKeyARetourner = snapshot.key;
  }
    )

    return leKeyARetourner; */
    return this.db.list('/utilisateurs2', ref => ref.orderByChild('email').limitToFirst(1).equalTo(email)).valueChanges()
    //return this.db.object('/utilisateurs2', ref => ref.orderByChild('email').equalTo(email)).valueChanges()
  }



  
  getSallesForAUser(email:string){
    /*
        let leKeyARetourner;
        this.db.list('/utilisateurs2').query.orderByChild('email').equalTo('daomag30@yahoo.com').on("child_added", function(snapshot) {
          console.log(snapshot.key + " was " + snapshot.val());
          leKeyARetourner = snapshot.key;
      }
        )
    
        return leKeyARetourner; */
        return this.db.list('/salles2', ref => ref.orderByChild('proprio/email').equalTo(email)).valueChanges()
        //return this.db.object('/utilisateurs2', ref => ref.orderByChild('email').equalTo(email)).valueChanges()
      }
























  emitProprios() {
    this.propriosSubject.next(this.prorietaires);
  }

  saveProprios() {
    firebase.database().ref('/utilisateurs').set(this.prorietaires);
  }

  updateProprio(id, proprioTOmodify: Proprietaire) {
    firebase.database().ref('/utilisateurs/' + id).set(proprioTOmodify);
  }

  getProprios() {
    firebase.database().ref('/utilisateurs')
      .on('value', (data) => {
        this.prorietaires = data.val() ? data.val() : [];
        this.emitProprios();
      })
  }

  getSingle(id) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/utilisateurs/' + id).once('value').then(
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

  getUserDataByEmail(email) {
    let leproprioEl = new Proprietaire('', '', '', '', '');
    console.log("hryyyyyyyyyyyyyyyyyyyyyyyyyy");
    const proprioIndexToReturn = this.prorietaires.findIndex(
      (proprioEl) => {
        console.log(proprioEl);
        console.log(email);
        if (proprioEl.email == email) {
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
    //return this.prorietaires.length-1;
  }

  removeProrio(proprio: Proprietaire) {
    const proprioIndexToRemove = this.prorietaires.findIndex(
      (proprioEl) => {
        if (proprioEl == proprio) {
          return true;
        }
      }
    )
    this.prorietaires.splice(proprioIndexToRemove, 1);
    this.saveProprios();
    this.emitProprios();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const almostUniqueFileName = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + almostUniqueFileName + file.name)
          .put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement en cours...')
          },
          (error) => {
            console.log('Erreur de chargement' + error);
            reject(error)
          },
          () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        )
      }
    )
  }
}
