import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import * as firebase from 'firebase';

export const config = {
  apiKey: "AIzaSyCrbisz--ptIQ7qC_2Z5wKmC7Ua666f6Oc",
  authDomain: "tree-ef2be.firebaseapp.com",
  databaseURL: "https://tree-ef2be.firebaseio.com",
  projectId: "tree-ef2be",
  storageBucket: "tree-ef2be.appspot.com",
  messagingSenderId: "549911202180",
  appId: "1:549911202180:web:4511176b7d0e5aa7"
};

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    firebase.initializeApp(config);
  }
}

