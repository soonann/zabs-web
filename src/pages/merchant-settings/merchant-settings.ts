import { AuthService } from './../../providers/auth-service';
import { Merchant } from './../../models/Merchant';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the MerchantSettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-merchant-settings',
  templateUrl: 'merchant-settings.html',
})
export class MerchantSettingsPage {

  merchant:Merchant;
  merchantIdState = 'password'
  merchantIdButtonText = 'Show'
  merchantIdIsHidden = true;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService) {

    this.merchant = new Merchant('','','','','')

  }


  toggleId(){
    if(this.merchantIdIsHidden){
      this.merchantIdIsHidden = false;
      this.merchantIdButtonText = 'Hide'
      this.merchantIdState = 'text'
    }
    else{
      this.merchantIdIsHidden = true;
      this.merchantIdButtonText = 'Show'
      this.merchantIdState = 'password'
    }
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad MerchantSettingsPage');
  }
}
