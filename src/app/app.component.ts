import { MerchantSettingsPage } from './../pages/merchant-settings/merchant-settings';
import { MerchantHomePage } from './../pages/merchant-home/merchant-home';
import { LoginPage } from './../pages/login/login';

import { Deeplinks } from '@ionic-native/deeplinks';

import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = MerchantSettingsPage ;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public deeplinks: Deeplinks
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
      

    });
  
  
  }
  logOut(){
    // this.nav.setRoot(MerchantSettingsPage)
  }

  goToSettings(){
    this.nav.setRoot(MerchantSettingsPage)
  }



}
