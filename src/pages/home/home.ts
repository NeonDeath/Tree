import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';

import {Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import 'firebase/firestore'
import 'firebase/auth'
import { AgregarPage } from '../agregar/agregar';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  db: firebase.firestore.Firestore;

  login = LoginPage;
  agregarPage = AgregarPage;

  user: firebase.User;
  items = [];


  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public camera: Camera) {
    this.user = firebase.auth().currentUser;
    this.db = firebase.firestore();

    this.db.collection('tree')
    .onSnapshot(query => {
      this.items = [];
      query.forEach(imagen => {
        if(imagen.data().user == this.user.uid)
        {
          this.items.push(imagen.data());
        }
      })
    });

  }

  ionViewDidEnter()
    {
      this.items = [];
      this.getDocuments('Tree');
    }
  

  getDocuments(collection:string)
  {
    this.db.collection(collection).where('user', '==', this.user.uid).get()
    .then((res: any) => {
      res.forEach(element => {
        let trees = {
          id: element.id, 
          posicion: element.data().posicion,
          copa: element.data().copa,
          tronco: element.data().tronco,
          foto: element.data().foto,
          arbol: element.data().tipo
        };
        this.items.push(trees);
      });
    })
    .catch(error => {
      console.log('error al conectar a firestore');
    });
  }

  logout()
  {
    firebase.auth().signOut()
    .then(data => {
      const toast= this.toastCtrl.create({
        message: "Se cerró sesión correctamente",
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.setRoot(this.login);
    })
    .catch(error => {
      const toast= this.toastCtrl.create({
        message: "Intenté cerrar sesión después",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  getPicture()
  {
    const options:CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    this.camera.getPicture(options)
    .then(imagen => {
      this.navCtrl.push(this.agregarPage, { imagen: 'data:image/jpeg;base64,' + imagen});

    }, error => {
      console.log(JSON.stringify(error));
    })
  }

}
