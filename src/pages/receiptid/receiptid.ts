import { Component } from '@angular/core';
import { Item } from './../../models/Receipt/RItem';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { Receipt } from '../../models/Receipt/Receipt';

/**
 * Generated class for the ReceiptidPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@IonicPage({segment:'receipt/:receiptId'})
@Component({
  selector: 'page-receiptid',
  templateUrl: 'receiptid.html',
})
export class ReceiptidPage {
  receiptId: string = ''
  receipt: Receipt;
  orderSize1: Item[];
  orderSize2: Item[];
  orderSize3: Item[];
  zabsQR: string;


  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private ngxQR:NgxQRCodeModule,
    private platform:Platform

    ) 
  {

    this.platform.registerBackButtonAction(()=>{
      this.navCtrl.pop();
    });

    this.receipt = this.navParams.data;
    if (!this.receipt.isManualEntry)
      this.zabsQR = this.receipt.key
    
    console.log(this.receipt);
    if(this.receipt.order != null  && this.receipt.order != undefined && !this.receipt.isManualEntry){
      this.orderSize1 = this.receipt.order.items.filter(x=>{
        return x.size == 1
      })
      this.orderSize2 = this.receipt.order.items.filter(x=>{
        return x.size ==2
      })
      this.orderSize3 = this.receipt.order.items.filter(x=>{
        return x.size ==3
      })

    }
  }
    
  ionViewDidLoad(){
    
    console.log(this.navParams.get('receiptId'))
    this.receiptId = this.navParams.get('receiptId');
  }
  


  viewMerchantPage(websiteUrl: any){
    if (websiteUrl != null)
      window.open(websiteUrl,'_system', 'location=yes');
  }



  


}
