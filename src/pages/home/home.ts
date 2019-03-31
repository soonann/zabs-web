import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public skills : string;
  public email : string;
  public phone : any;
  public password : any;
  public first_name : any;
  public last_name : any;
  public city : any;
  public state : any;
  public country : any;
  public isJobSeeker : boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public usersserviceProvider : UsersserviceProvider, 
    public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
      //
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }


  doSignup(){

    var   account = {
      first_name: this.first_name,
      last_name: this.last_name || '',
      skills: this.skills || '',
      email: this.email,
      phone: this.phone || '',
      password: this.password,
      city: this.city || '',
      state: this.state || '',
      country: this.country || '',
      isJobSeeker : this.country || ''

    };
var that = this;

var loader = this.loadingCtrl.create({
      content: "Please wait...",
      
    });
    loader.present();


  	this.usersserviceProvider.signupUserService(account).then(authData => {
  		//successful
  		loader.dismiss();
  		that.navCtrl.setRoot(HomePage);

  	}, error => {
loader.dismiss();
     // Unable to log in
      let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();

      that.password = ""//empty the password field

  	});

    
  }

}

  // submitForm(form:NgForm){
  //   form.
  //   if(form.valid){
  //     // if the whole form is valid 
  //   }
  //   else{
  //     // else ? alert fill up all ?
  //   }
  // }
}
