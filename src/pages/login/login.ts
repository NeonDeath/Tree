import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';


import * as firebase from 'firebase';
import 'firebase/auth';
import { RegistroPage } from '../registro/registro';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  
  home = HomePage;
  email = '';
  password = '';
  registro = RegistroPage;

  auth: firebase.auth.Auth;

  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public alertCtrlr: AlertController) {
    this.auth = firebase.auth();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }


  login()
  {
    //console.log(this.email, this.password);
   
    
    this.auth.signInWithEmailAndPassword(this.email, this.password)
    .then(data => {
      console.log(JSON.stringify(data));
      this.navCtrl.setRoot(this.home);
    })
    .catch(error => {
      console.log(JSON.stringify(error));
      let alert = this.alertCtrlr.create({
        title: "Error",
        subTitle: error.message,
        buttons: ["Ok"]
      })
      alert.present();
    });

  }

  signin()
  {
    this.navCtrl.push(this.registro);
  }

}
