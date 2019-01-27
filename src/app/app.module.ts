import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from './../providers/auth-service';
import { MerchantSettingsPage } from './../pages/merchant-settings/merchant-settings';
import { MerchantHomePage } from './../pages/merchant-home/merchant-home';
import { MerchantFirebaseProvider } from './../providers/merchant-firebase';
import { ReceiptFirebaseProvider } from './../providers/receipt-firebase';
import { LoginPage } from './../pages/login/login';

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, DeepLinkConfig, List } from 'ionic-angular';

import { MyApp } from './app.component';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Deeplinks } from '@ionic-native/deeplinks';
import { NgxQRCodeModule, NgxQRCodeComponent } from 'ngx-qrcode2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, NgForm } from '@angular/forms';




const config = {
  apiKey: "AIzaSyCR0e5uvtyz59MTBQYF1lqhl4sHMV_juEs",
  authDomain: "zabs-fb-dev.firebaseapp.com",
  databaseURL: "https://zabs-fb-dev.firebaseio.com",
  projectId: "zabs-fb-dev",
  storageBucket: "zabs-fb-dev",
  messagingSenderId: "113696640369"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    MerchantHomePage,
    MerchantSettingsPage 

  ],
  imports: [
    BrowserModule,
    NgxQRCodeModule,
    FormsModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    MerchantHomePage,
    MerchantSettingsPage
    
  ],
  providers: [
    Deeplinks,
    StatusBar,
    SplashScreen,
    ReceiptFirebaseProvider,
    MerchantFirebaseProvider,
    NgForm,
    AuthService,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
