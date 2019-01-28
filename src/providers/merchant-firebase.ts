import { AngularFireStorage } from 'angularfire2/storage';
import { AuthService } from './auth-service';
import { Merchant } from './../models/Merchant';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase'
 

@Injectable()

export class MerchantFirebaseProvider {

  list: Merchant[]; // Stores the expense list for search functionality
  node = '/merchants/';
  user :{uid} = {uid:''} ;

  constructor(private db: AngularFireDatabase, 
    private auth:AuthService,
    private store:AngularFireStorage) {
    this.auth.getCurrentUserObserver().subscribe(x=>{
      this.user = x;
    })
  }

 

  getAllMerchants(): Observable<any[]> {

    let observable: Observable<any[]>;
    // retrieve json from firebase 
    observable = this.db.list(this.node).snapshotChanges()
    
    // pipe to combine a few functions together to achieve your outcome
    .pipe(
      map(changes => changes.map(c => ({ key: c.payload.key, ...c.payload.val() })))
    );

    // pipe itself doesn't do anything unless it is subscribed to 
    observable.subscribe(result => {this.list = result;});
    
    // return the observable
    return observable;

  }

   

  getLoggedInMerchant(): Observable<any> {

    let observable: Observable<any>;

    
    observable = this.db.object('/merchants/'+ this.user.uid ).valueChanges()
    

    return observable;

  }

 

  getItemsByStatus(status: string): Observable<any[]> {

    return this.db.list(this.node, ref => ref.orderByChild('id').equalTo(status)).snapshotChanges().pipe(

      map(changes =>

        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

  }

 

  searchItems(val: string): Merchant[] {

    if (!val || !val.trim()) {
      // if no search term, return all expenses.
      return this.list;
    }
    val = val.toLowerCase();
    return this.list.filter(item => true);
  }
  addLogoByPath(file ){
      
    var ref = firebase.storage();
      var photoRef = ref.ref('/company_logo/'+ this.user.uid +'.jpg'  );
      // let img  = base64Image.split(',')[1];

      return photoRef.put(file);
    
  }


  getDownloadUrlByPath(){

    var ref = firebase.storage().ref();
    var photoRef = ref.child('/company_logo/' + this.user.uid +'.jpg');
    return photoRef.getDownloadURL();
  }



  addItem(item) {
    this.db.list('/item').push(item);
  }


  removeItem(item) {
    this.db.list(this.node).remove(item.key);
  }

 
  updateItem(key,item) {
    

    return this.db.list('/merchants/').update(key, {

      name:item.name,
      logo:item.logo,
      websiteUrl:item.websiteUrl,
      branch:item.branch

    });
  }
  updateItemWOImg(key,item) {
    

    return this.db.list('/merchants/').update(key, {

      name:item.name,
      websiteUrl:item.websiteUrl,
      branch:item.branch

    });
  }

 

}