import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';

import * as firebase from 'firebase/app';

import {AngularFireDatabase} from 'angularfire2/database'
import { Profile } from '../models/profile';

 

@Injectable()

export class AuthService {

     public user: firebase.User;
     public profile: Profile;

 

    constructor(public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase) {

         afAuth.authState.subscribe(user => {

             this.user = user;

             if (user) {

                  console.log('Email ' + user.email);

                  console.log('Display ' + user.displayName);

             }

         });

         

    }

   
    getCurrentUserObserver() {

         return this.afAuth.authState;

    }

    /*createProfile(){
         this.afAuth.authState.take(1).subscribe(() =>{
              this.afDatabase.list('/profile/').push(this.profile)         
         })
    }*/
 

    getCurrentUser() {

         return firebase.auth().currentUser;

    }

 

    login(email: string, password: string) {

         return this.afAuth.auth.signInWithEmailAndPassword(email, password);

    }

 

    logout(){

         this.afAuth.auth.signOut();

    }


 

    emailVerification(){
        this.user = firebase.auth().currentUser;
        if (this.user){
           this.user.sendEmailVerification();
        }
    }

    resetPassword(){
         this.user = firebase.auth().currentUser;
         if (this.user){
         this.afAuth.auth.sendPasswordResetEmail(this.user.email);
         }
    }

    getEmail(){
        this.user = firebase.auth().currentUser;

        if (this.user){
            return this.user.email;
        }
    }

    
    updateProfile(displayName:string, photoURL:string) {

         this.user = firebase.auth().currentUser;

         if (this.user) {

             console.log('Update profile of ' + this.user.email);

             return this.user.updateProfile({

                  displayName: displayName,

                  photoURL: photoURL

               });

         }

    }
 

}