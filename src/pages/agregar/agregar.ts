import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';
import * as firebase from 'firebase';
import 'firebase/firestore';
import 'firebase/auth'

/**
 * Generated class for the AgregarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregar',
  templateUrl: 'agregar.html',
})
export class AgregarPage {

  imagen;
  storage: firebase.storage.Storage;
  db: firebase.firestore.Firestore;
  user:firebase.User;
  
  arbol: string = '';
  copa: string = '';
  tronco: string = '';
  posicion: string = '';
  latitud = 0;
  longitud = 0;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private geolocation: Geolocation) {

      this.geolocation.getCurrentPosition().then((resp) => {
        this.latitud = resp.coords.latitude;
        this.longitud = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });
     
      this.imagen = this.navParams.get('imagen');
      this.storage = firebase.storage();
      this.db = firebase.firestore();
      this.user = firebase.auth().currentUser;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AgregarPage');
  }

  agregar()
  {
    let tree = {
      arbol: this.arbol,
      tronco: this.tronco,
      posicion: this.posicion,
      copa: this.copa,
      url: '',
      user: this.user.uid,
      latitud: this.latitud,
      longitud: this.longitud
    };

    let loading = this.loadingCtrl.create({
      content: "Subiendo..."
    });
    loading.present();

    this.db.collection('tree').add(tree)
    .then(ref => {
     // let nombre = ref.id;
        
      let uploadTask = this.storage.ref('trees/' + 'foto' + 'jpg').putString(this.imagen, 'data_url');

      uploadTask.then( exito =>{
        loading.dismiss();
        let url = exito.downloadURL;
        ref.update({url: url});

        this.navCtrl.pop();
      })
      .catch(error =>{
        console.log(JSON.stringify(error));
      });
    })
  }
}

