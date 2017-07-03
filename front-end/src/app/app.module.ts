import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AgmCoreModule } from '@agm/core';
import { IonicStorageModule } from '@ionic/storage';
import 'rxjs/add/operator/map';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from './../pages/configuration/config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

import { LocationServices } from './../services/location-services';
import { BackgroudLocationServices } from './../services/background-location-services';
import { ConfigurationServices } from './../services/configuration-services';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2efegxAbKYZcLNgiWsSWofkVEpA-S83E'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BackgroundGeolocation,
    BackgroudLocationServices,
    LocationServices,
    ConfigurationServices,
    HttpModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
