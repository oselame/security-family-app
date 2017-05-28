import { NewMemberPage } from './../new-member/new-member';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import { ModalController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ConfigPage } from './../config/config';

import { ConfigurationServices } from './../../services/configuration-services';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = 0;
  lng: number = 0;

  options: GeolocationOptions = {
    maximumAge: 0,
    timeout: 40000,
    enableHighAccuracy: true
  };
  
  constructor(public navCtrl: NavController, 
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public platform: Platform,
    public configServices : ConfigurationServices) {
  }

  ionViewWillEnter(){
    console.log("ionViewWillEnter");
    this.onLoadPage();    
  }

  ionViewDidLoad(){
    //console.log("ionViewDidLoad");
    //this.onLoadPage();
  }

  onLoadPage() {
    if (this.existsConfigApp()) {
        /*
        this.geolocation.getCurrentPosition(this.options)
          .then((resp) => {
            this.lat = resp.coords.latitude;
            this.lng = resp.coords.longitude;
            console.log("lat: " + this.lat + " / lng: " + this.lng);
          }).catch((error) => {
            console.log('Error getting location', error);
            this.showAlert();
          });*/
    } else {
      this.navCtrl.push(ConfigPage);
    }
  }

  existsConfigApp() {
    console.log("Consultando configuration");
    return this.configServices.existsConfiguration()
      .then(
        (config) => {
          console.log("Config is " + config);
          return config;
        }
      ).catch(
        (error) => {
          console.log("Error is " + error);
          return false;
        }
      );
  }

  exitApp(){
    this.platform.exitApp();
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Hi Friend',
      subTitle: 'Your GPS is closed, I d\'not work without him',
      buttons: [
        {
            text: 'OK',
            handler: () => this.exitApp()
        }]
    });
    alert.present();
  }  

  onNewMember() {
    //this.modalController.create(NewMemberPage).present();    
    this.navCtrl.push(NewMemberPage);
  }

}
