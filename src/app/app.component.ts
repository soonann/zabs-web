import { Merchant } from './../models/Merchant';
import { MerchantFirebaseProvider } from './../providers/merchant-firebase';
import { AuthService } from './../providers/auth-service';
import { MerchantSettingsPage } from './../pages/merchant-settings/merchant-settings';
import { MerchantHomePage } from './../pages/merchant-home/merchant-home';
import { LoginPage } from './../pages/login/login';

import { Deeplinks } from '@ionic-native/deeplinks';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subscription } from 'rxjs';


@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage ;
  user: string = '';
  pages: Array<{title: string, component: any}>;
  merchant:Merchant = new Merchant(
    '','','','','')
  sub:Subscription;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public auth: AuthService,
    public menuCtrl: MenuController,
    public merch:MerchantFirebaseProvider
 ) {
    this.initializeApp();

    // used for an example of ngFor and navigation

  }

  initializeApp() {
  
    this.platform.ready().then(() => {    
      
          // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    
      this.auth.afAuth.authState.subscribe(x=>{
      
        
        if(x == null){
          if (this.sub != undefined)
            this.sub.unsubscribe();
          this.menuCtrl.enable(false, 'zabs-consumer-menu');
          this.menuCtrl.swipeEnable(false, 'zabs-consumer-menu' )
          this.nav.setRoot(LoginPage);
       
        }
    
        // Logged in
        else{
          this.sub = this.merch.getLoggedInMerchant().subscribe(x=>{
            this.merchant = x;
            this.merchant.key = x
            if (this.merchant.logo == '' ){
              this.merchant.logo = 'https://firebasestorage.googleapis.com/v0/b/zabs-fb-dev/o/company_logo%2Fbiz-placeholder.png?alt=media&token=1543d0a2-051a-4c56-a5d4-468f1e7a1b9b'
            }
          })
          this.user = x.email;
          this.menuCtrl.swipeEnable(true, 'zabs-consumer-menu')
          this.menuCtrl.enable(true, 'zabs-consumer-menu');
          this.nav.setRoot(MerchantSettingsPage);
      
  

          
        }


      });


    });
  
  
  }
  logOut(){
    this.auth.logout();
  }

  goToSettings(){
    this.nav.setRoot(MerchantSettingsPage)
  }



}
