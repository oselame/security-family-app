import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Diagnostic } from '@ionic-native/diagnostic';
import { Geolocation } from '@ionic-native/geolocation';

import { HomePage } from '../pages/home/home';
import { ConfigPage } from './../pages/configuration/config';
//import { PrincipalPage } from './../pages/principal/principal';
import { MemberListPage } from './../pages/member-list/member-list';

import { ConfigurationServices } from './../services/configuration-services';

import { Config } from './../config/config';

const GEOLOCATION_OPTIONS = { 
        maximumAge: 3000, 
        timeout: 1000, 
        enableHighAccuracy: true 
      };

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, 
          public splashScreen: SplashScreen,
          private diagnostic: Diagnostic,
          private geolocation: Geolocation,
          private alertCtrl: AlertController,
          private configService: ConfigurationServices) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Configuration', component: ConfigPage },
      { title: 'Members', component: MemberListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
          /*
          this.isLocationAuthorizated()
            .then((resp) => {
                console.log('Localization Autorized');
                this.geolocation.getCurrentPosition(GEOLOCATION_OPTIONS)
                  .then((resp) => {  
                      console.log('Current Position Loaded');
                      //this.rootPage = PrincipalPage;
                      this.existUserConfig()
                        .then(() => {
                          console.log('User config exists');
                        }).catch(
                          () => {
                            console.log('User config no exists');
                            this.nav.push(ConfigPage);
                          }
                        );
                        this.statusBar.styleDefault();
                        this.splashScreen.hide();
                  }).catch((error) => {
                    console.log('Current Position not loaded: ' + error.message);
                    this.openAlertNotGeolocation("O App não conseguiu pegar sua localização", 
                        "Por favor ligue sua localização e tente novamente.");
                  });
              }
            ).catch((error) => {
                console.log('Localization not autorized');
                if (error === Config.ERRO_GPS_DISABLED){
                  this.openAlertNotGeolocation("O serviço de localização esta desligado", "Por favor ligue sua localização e tente novamente.");
                } else {
                  this.openAlertNotGeolocation("Você deve permitir que o aplicativo pegue sua localização", "Por favor autorize o serviço de localização e tente novamente.");        
                }
                console.log("Error " + error.message);
              }
            );
            */
            this.statusBar.styleDefault();
            this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.push(page.component);
  }

  isLocationAuthorizated():Promise<any> {
    return new Promise((resolve, reject) => {
      resolve(Config.SUCCESS)
      /*
      this.diagnostic.getLocationAuthorizationStatus()
        .then( value => {
          console.log("Autorization: " + value);
          resolve(Config.SUCCESS);
        })
        .catch( error => {
          console.log("Erro location autorization: " + error);
          reject(Config.ERRO_NOT_AUTHORIZED);
        });
      this.diagnostic.requestLocationAuthorization(Config.LOCATIONAUTHORIZATION_ALWAYS)
        .then( value => {
          console.log("Autorization: " + value);
          resolve(Config.SUCCESS);
        })
        .catch( error => {
          console.log("Erro location autorization: " + error);
          reject(Config.ERRO_NOT_AUTHORIZED);
        });
      */
    })
  }

  existUserConfig():Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.configService.existsConfigUser().
        then(exists => resolve(exists))
        .catch(noexists => reject(noexists));
    });
  }

  openAlertNotInternet(){
    let alert = this.alertCtrl.create({
            title: "Sem conexão com a internet",
            subTitle: "Por favor verifique sua conexão e tente novamente.",
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.platform.exitApp();
              }
            }]
        });
    alert.present();
  }

  openAlertNotGeolocation(title: string, subTitle: string){
    let alert = this.alertCtrl.create({
            title: title,
            subTitle: subTitle,
            buttons: [{
              text: 'Ok',
              handler: () => {
                this.platform.exitApp();
              }
            }]
        });
    alert.present();
  }
}