import { ConfigPage } from './../pages/config/config';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Diagnostic } from '@ionic-native/diagnostic';

import { HomePage } from '../pages/home/home';
import { NewMemberPage } from './../pages/new-member/new-member';
import { MemberListPage } from './../pages/member-list/member-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public diagnostic: Diagnostic
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Config', component: ConfigPage },
      { title: 'Members', component: MemberListPage},
      { title: 'Add Member', component: NewMemberPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      //this.isGpsLocationAvailable();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isGpsLocationAvailable() {
    this.diagnostic.requestLocationAuthorization().then(
      (isAvailable) => {
        console.log('Is available? ' + isAvailable);
      }
    ).catch(
      (err) => console.error(err)
    );
    /*
    this.diagnostic.isGpsLocationAvailable().then(
      (isAvailable) => {
        console.log('Is available? ' + isAvailable);
      }
    ).catch(
      (e) => console.error(e)
    );*/
  }
/*
  isLocationEnabled() {
    this.diagnostic.isLocationEnabled().then(this.successCallback).catch(this.errorCallback);
  }
*/
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    //this.nav.setRoot(page.component);
    this.nav.push(page.component);
  }
}
