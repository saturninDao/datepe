import { Injectable } from '@angular/core';
import { Salle } from '../models/salle.model';
import { Subject } from 'rxjs';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class SallesService {

  private dbPath = '/salles2';

  sallesRef: AngularFireList<Salle> = null;

  salles: Salle[] = [];
  signedUser: string;
  sallesSubject = new Subject<Salle[]>();

  constructor(private authService: AuthService,private db: AngularFireDatabase) {
    this.sallesRef = db.list(this.dbPath);
   }



   getAll(): AngularFireList<Salle> {
    return this.sallesRef;
  }

  create(salle: Salle): any {
    return this.sallesRef.push(salle);
  }

  update(key: string, value: any): Promise<void> {
    return this.sallesRef.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.sallesRef.remove(key);
  }

  deleteAll(): Promise<void> {
    return this.sallesRef.remove();
  }




  emitSalles(){
    this.sallesSubject.next(this.salles);
  }


  emitForProprio(){
    this.authService.whoIsConnected().then((resolve:string)=>{
      this.signedUser=resolve;
    })
    let sallesDuProprio: Salle[]=[];
    this.salles.findIndex(
        (salle)=>{
          if(salle.proprio.email==this.signedUser){
            sallesDuProprio.push(salle);
            console.log(sallesDuProprio);
            this.salles = sallesDuProprio;
          }else{
            this.salles = [];
          }
        }
      )
  }

  isSalleForMe(salle: Salle): boolean {
    this.authService.whoIsConnected().then((resolve: string) => {
      this.signedUser = resolve;
    })

    if (salle.proprio.email == this.signedUser) {
      return true;
    } else {
      return false;
    }
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
