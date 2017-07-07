import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AgmCoreModule } from '@agm/core';
import { IonicStorageModule } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';
import { AppPreferences } from '@ionic-native/app-preferences';
import 'rxjs/add/operator/map';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from './../pages/configuration/config';
import { PrincipalPage } from './../pages/principal/principal';
import { MemberListPage } from './../pages/member-list/member-list';
import { NewMemberPage } from './../pages/new-member/new-member';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

import { LocationServices } from './../services/location-services';
import { MemberServices } from './../services/member-services';
import { BackgroudLocationServices } from './../services/background-location-services';
import { ConfigurationServices } from './../services/configuration-services';

import { MemberProvider } from './../providers/member/member.provider';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage,
    PrincipalPage,
    NewMemberPage,
    MemberListPage
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
    ConfigPage,
    PrincipalPage,
    NewMemberPage,
    MemberListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpModule,
    Diagnostic,
    Geolocation,
    BackgroundGeolocation,
    BackgroudLocationServices,
    LocationServices,
    MemberServices,
    ConfigurationServices,
    AppPreferences,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MemberProvider
  ]
})
export class AppModule {}
