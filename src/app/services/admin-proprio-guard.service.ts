import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminProprioGuardService {

  constructor(private router: Router) { }
  canActivate():Observable<boolean> | Promise<boolean> | boolean{
    return new Promise(
      (resolve,reject)=>{
        firebase.auth().onAuthStateChanged(
          (user)=>{
            if(user.email){
              resolve(true);
            }else{
              this.router.navigate(['/auth','connexion']);
              resolve(false);
            }
          }
        )
      }
    )
  }
}
