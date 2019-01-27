import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth-service';
import { AngularFireAuth } from 'angularfire2/auth';
import { Merchant } from './../models/Merchant';
import { MerchantFirebaseProvider } from './merchant-firebase';
import * as firebase from 'firebase';

import { Receipt } from '../models/Receipt/Receipt';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireStorage } from 'angularfire2/storage'
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';


 

@Injectable()

export class ReceiptFirebaseProvider {

  receiptList: Receipt[];
  merchantList : Merchant[];
  user: firebase.User;

  constructor(
    private db: AngularFireDatabase, 
    private store:AngularFireStorage, 
    private auth: AngularFireAuth,
    private merchant:MerchantFirebaseProvider,
    private http: HttpClient
    ){

    this.auth.user.subscribe( data=>{
      this.user = data;
      
    })
    
    this.merchant.getAllMerchants().subscribe((data)=>{
      this.merchantList = data;
    });
    

  }

  getReceiptByWeb():Observable<any[]>{

    let receipts$: Observable<any[]>;

    receipts$ = this.db.list<Receipt>('/receipts/', qr => qr.orderByChild("isVisible").equalTo(true)).snapshotChanges().pipe(

      // map initial format to object format
      map(x => x.map(y => ({ key: y.payload.key, ...y.payload.val()}))),
      
      map(x => {  return x.map(y => {
        y.date_dt = new Date(y.date);
        y.merchant = this.merchantList.find( merch => merch.key == y.merchantId );
        return y;
        })} 
      )

    );
    
    
    // return the observable
    return receipts$;
  }
  
  getReceiptsByLoggedInUser(): Observable<any[]> {
    
    let receipts$: Observable<any[]>;

    receipts$ = this.db.list<Receipt>('/receipts/'+ this.user.uid, qr => qr.orderByChild("isVisible").equalTo(true)).snapshotChanges().pipe(

      // map initial format to object format
      map(x => x.map(y => ({ key: y.payload.key, ...y.payload.val()}))),
      
   
      // // calculate total values
      // map(x => { 

      //   return this.calculateTotal(x)
      // }),

      // bind merchant
      map(x => {  return x.map(y => {
        y.date_dt = new Date(y.date);
        y.merchant = this.merchantList.find( merch => merch.key == y.merchantId );
        return y;
        })} 
      ),


      // sort values by date
      map(x => x.sort((a,b) => {
 
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      }))

    );
    
    
    // return the observable
    return receipts$;

  }


  getReceiptsByUserFavourited(): Observable<any[]> {
    
    let receipts$: Observable<any[]>;

    receipts$ = this.db.list<Receipt>('/receipts/'+ this.user.uid, qr => qr.orderByChild("isVisible").equalTo(true)).snapshotChanges().pipe(

      // map initial format to object format
      map(x => x.map(y => ({ key: y.payload.key, ...y.payload.val()}))),
      
   
      // // calculate total values
      // map(x => { 

      //   return this.calculateTotal(x)
      // }),

      // bind merchant
      map(x => {  return x.map(y => {
        y.date_dt = new Date(y.date);
        y.merchant = this.merchantList.find( merch => merch.key == y.merchantId );
        return y;
        })} 
      ),

      map(x=> x.filter(y=>{
        return y.isSaved;
      })),


      // sort values by date
      map(x => x.sort((a,b) => {
 
        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      }))

    );
    
    
    // return the observable
    return receipts$;

  }



  
  
  getReceiptsByDate(month, year): Observable<any[]> {
    
    let receipts$: Observable<any[]>;

    receipts$ = this.db.list<Receipt>('/receipts/'+ this.user.uid, qr => qr.orderByChild("isVisible").equalTo(true)).snapshotChanges().pipe(

      // map initial format to object format
      map(x => x.map(y => ({ key: y.payload.key, ...y.payload.val()}))),
      
   
      // // calculate total values
      // map(x => { 

      //   return this.calculateTotal(x)
      // }),

      // bind merchant
      map(x => {  return x.map(y => {
        
        y.merchant = this.merchantList.find( merch => merch.key == y.merchantId );
        return y;
        })} 
      ),
      map(x=> x.filter(y=>{
        console.log(new Date(y.date).getMonth()+1, new Date(y.date).getFullYear())
        return new Date(y.date).getMonth()+1 == month && new Date(y.date).getFullYear() == year
      })),

      // sort values by date
      map(x => x.sort((a,b) => {

        return new Date(b.date).valueOf() - new Date(a.date).valueOf();
      }))
    
      
    );
    
    
    // return the observable
    return receipts$;

  }






  searchReceipt(receipts: Receipt[], searchText:string){
    return receipts.filter(x=>{
      x.merchant.name.toLowerCase().includes(searchText.toLowerCase())
    });
  }

  getSelectedReceipts(data: any[]): any[]{
    return data.filter(x=>x.isSelected);
  }


  toggleFavourite(path,receiptKey,isSaved){
    this.db.list(path).update(receiptKey, isSaved);
  }


  hideItem(path,receiptKey,isVisible){
    this.db.list(path).update(receiptKey, isVisible);
  }
  

  // do i still keep this? lol 
  calculateTotal(data: any[]): any[] {

    data.forEach(x => {

      // for each item in the list 
   
      x.transaction.items.forEach(y => {

    
        x.transaction.subtotal? 
        x.transaction.subtotal += (y.price * y.qty):
        x.transaction.subtotal = (y.price * y.qty);  

      });
      
      // undefined
 
      if(typeof(x.transaction.subItems) != 'undefined'){
        x.transaction.subItems.forEach(y =>{

          x.transaction.total? 
          x.transaction.total += (y.price * y.qty):
          x.transaction.total =  x.transaction.subtotal +  (y.price * y.qty);

        });

      }
      // not undefined
      else{
        // no additional items, so total = subtotal
        x.transaction.total =  x.transaction.subtotal
       
      }
    

    })

    return data;
  }


  // getItemsByStatus(status: string): Observable<any[]> {

  //   return this.db.list(this.node, ref => ref.orderByChild('status').equalTo(status)).snapshotChanges().pipe(

  //     map(changes =>

  //       changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))));

  // }

  createManualEntry(entry: Receipt){
    return this.db.list('/receipts/'+ this.user.uid +'/' ).update(entry.key,{
      date: firebase.database.ServerValue.TIMESTAMP.valueOf(),
      transaction: {total: entry.transaction.total },
      isManualEntry: true,
      isVisible: true,
      isSaved: false,
      category: entry.category,
      isLoading:false,
      manualMerchantName: entry.manualMerchantName,
      manualImgSrc: entry.manualImgSrc,
      manualImgPath: entry.manualImgPath,
      manualImgExtract: entry.manualImgExtract
  
    });
    
       
  }

 
  addReceiptByPath(base64Image:string, key ){
      
      var ref = this.store.storage.ref();
      var photoRef = ref.child('/receipt_images/'+ this.user.uid +'/' + key  );
      let img  = base64Image.split(',')[1];
      return photoRef.putString(img, 'base64', { contentType: 'image/jpeg' });
    
  }


  getReceiptUrlByPath(key:string){
    var ref = firebase.storage().ref();
    var photoRef = ref.child('/receipt_images/' + this.user.uid + "/"+key);
    return photoRef.getDownloadURL();
  }


  // getDownloadUrl(imageUrl: string) {
  
  //   var ref = firebase.storage().ref();

  //   var photoRef = ref.child(imageUrl);

  //   return photoRef.getDownloadURL();

  // }
  addItem(item) {
    this.db.list('/item').push(item);
  }


  removeItem(item) {
    this.db.list('/receipts').remove(item.key);
  }

 
  updateItem(path,item) {
    this.db.list(path).update(item.key, item);
  }


    generatePushID = (function() {
    // Modeled after base64 web-safe chars, but ordered by ASCII.
    var PUSH_CHARS = '-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz';

    // Timestamp of last push, used to prevent local collisions if you push twice in one ms.
    var lastPushTime = 0;

    // We generate 72-bits of randomness which get turned into 12 characters and appended to the
    // timestamp to prevent collisions with other clients.  We store the last characters we
    // generated because in the event of a collision, we'll use those same characters except
    // "incremented" by one.
    var lastRandChars = [];

    return function() {
      var now = new Date().getTime();
      var duplicateTime = (now === lastPushTime);
      lastPushTime = now;

      var timeStampChars = new Array(8);
      for (var i = 7; i >= 0; i--) {
        timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
        // NOTE: Can't use << here because javascript will convert to int and lose the upper bits.
        now = Math.floor(now / 64);
      }
      if (now !== 0) throw new Error('We should have converted the entire timestamp.');

      var id = timeStampChars.join('');

      if (!duplicateTime) {
        for (i = 0; i < 12; i++) {
          lastRandChars[i] = Math.floor(Math.random() * 64);
        }
      } else {
        // If the timestamp hasn't changed since last push, use the same random number, except incremented by 1.
        for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
          lastRandChars[i] = 0;
        }
        lastRandChars[i]++;
      }
      for (i = 0; i < 12; i++) {
        id += PUSH_CHARS.charAt(lastRandChars[i]);
      }
      if(id.length != 20) throw new Error('Length should be 20.');

      return id;
    };
  })();

 

}