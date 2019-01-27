import { AuthService } from './../../providers/auth-service';
import { MerchantHomePage } from './../merchant-home/merchant-home';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email:string = '' ;
  password:string = '' ;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth:AuthService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // TODO: VALIDATION


  
  showHomePage(params:any){
    this.auth.login(this.email,this.password);
    // this.navCtrl.setRoot(MerchantHomePage)
  } 
}
