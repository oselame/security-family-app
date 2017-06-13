import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AgmCoreModule } from 'angular2-google-maps/core';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicStorageModule } from '@ionic/storage';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ConfigPage } from './../pages/config/config';
import { NewMemberPage } from './../pages/new-member/new-member';
import { MemberListPage } from './../pages/member-list/member-list';

import { MemberServices } from './../services/member-services';
import { ConfigurationServices } from './../services/configuration-services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { UUID } from 'angular2-uuid';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ConfigPage,
    NewMemberPage,
    MemberListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA2efegxAbKYZcLNgiWsSWofkVEpA-S83E'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ConfigPage,
    NewMemberPage,
    MemberListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    MemberServices,
    ConfigurationServices,
    BackgroundGeolocation,
    UUID,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
