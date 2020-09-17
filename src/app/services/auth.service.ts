import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor() { }

createNewUser(email:string, password: string){
  
  return new Promise(
    (resolve,reject)=>{
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
          ()=>{
            resolve();
            console.log("what happened here? => "+resolve());
          },
          (error)=>{
            reject(error);
          }
        );
    }
  );
  }


  createNewUserWithGoogle(email:string, password: string){
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    firebase.auth().useDeviceLanguage();

    return new Promise(
      (resolve,reject)=>{
        firebase.auth().signInWithPopup(provider).then(function(result) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          //var token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          resolve();
          // ...
        }).catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;

          console.log(errorCode);
          console.log(errorMessage);
          console.log(email);
          console.log(credential);
          reject(error);
          // ...
        });
      }
    );

    
  }

  signInUser(email:string, password: string){
    return new Promise(
      (resolve,reject)=>{
        firebase.auth().signInWithEmailAndPassword(email,password).then(
          ()=>{
            resolve();
          },
          (error)=>{
            reject(error);
          }
        )
      }
      );
  }


  whoIsConnected() {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              //this.isAuth = true;
              resolve(user.email);
            } else {
              //this.isAuth =false;
            }
          }
        )
      })
  }

  signOut(){
    firebase.auth().signOut();
  }
}
