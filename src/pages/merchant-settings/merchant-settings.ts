import { MerchantFirebaseProvider } from './../../providers/merchant-firebase';
import { AuthService } from './../../providers/auth-service';
import { Merchant } from './../../models/Merchant';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
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
export class MerchantSettingsPage implements OnInit{

  merchant:Merchant;
  merchantIdState = 'password'
  merchantIdButtonText = 'Show'
  merchantIdIsHidden = true;
  imageB64 = '';
  file=''

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public auth: AuthService,
    public merch: MerchantFirebaseProvider,
    public alertCtrl: AlertController) {
    
    this.merchant = new Merchant(
    '','','','','')

  }

  ngOnInit() {
    this.merch.getLoggedInMerchant().subscribe(x=>{
      this.merchant = x;
      this.merchant.key = this.auth.user.uid;
      if (this.merchant.logo == '' ){
        this.merchant.logo = 'https://firebasestorage.googleapis.com/v0/b/zabs-fb-dev/o/company_logo%2Fbiz-placeholder.png?alt=media&token=1543d0a2-051a-4c56-a5d4-468f1e7a1b9b'
      }
    })
   
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

  saveDetails(form:NgForm){
    if(form.valid){
      if (this.file.trim() == ''){
        this.merch.updateItemWOImg(this.merchant.key, this.merchant).then(z=>{

          const alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Updated Details!',
            buttons: ['OK']

          });
          alert.present();
        });
      }else{
      this.merch.addLogoByPath(this.imageB64).then((x)=>{
        this.merch.getDownloadUrlByPath().then(y=>{
          this.merchant.logo = y;
          this.merch.updateItem(this.merchant.key, this.merchant).then(z=>{

            const alert = this.alertCtrl.create({
              title: 'Success!',
              subTitle: 'Updated Details!',
              buttons: ['OK']

            });
            alert.present();
          });
        })
        

      })
      }

    }
    else{
      const alert = this.alertCtrl.create({
        title: 'Invalid Details',
        subTitle: 'Please enter all required fields!',
        buttons: ['OK']
      });
      alert.present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MerchantSettingsPage');
  }

  changeListener($event){
    this.imageB64 = $event.target.files[0];
    console.log(this.imageB64);

  }
}
