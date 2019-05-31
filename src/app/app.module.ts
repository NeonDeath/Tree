import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import {Camera} from '@ionic-native/camera';
import {Geolocation} from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AgregarPage } from '../pages/agregar/agregar';
import { LoginPage } from '../pages/login/login';
import { RegistroPage } from '../pages/registro/registro';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AgregarPage,
    LoginPage,
    RegistroPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AgregarPage,
    LoginPage,
    RegistroPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera, Geolocation
  ]
})
export class AppModule {}
