import { NewMemberPage } from './../new-member/new-member';
import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { ConfigPage } from './../config/config';

import { Member } from './../../models/member-model';
import { MemberServices } from './../../services/member-services';
import { ConfigurationServices } from './../../services/configuration-services';
import { Geolocation, GeolocationOptions } from '@ionic-native/geolocation';

const options: GeolocationOptions = {
  maximumAge: 0,
  timeout: 40000,
  enableHighAccuracy: true
};

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  lat: number = 0;
  lng: number = 0;

  members: Member[] = [];

  constructor(public navCtrl: NavController,
    public geolocation: Geolocation,
    public alertCtrl: AlertController,
    public platform: Platform,
    public configServices: ConfigurationServices,
    public memberService: MemberServices) {}

  ionViewWillEnter() {
    this.onLoadPage();
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");
  }

  onLoadPage() {
    this.configServices.existsConfiguration()
      .then(
      (config) => {
        if (!!config) {
          this.loadMembers();
          this.showMap()
        } else {
          this.navCtrl.push(ConfigPage);
        }
      }
      ).catch(
      (error) => {
        console.log("Error is " + error);
      }
      );
  }

  exitApp() {
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
    this.navCtrl.push(NewMemberPage);
  }

  showMap() {
    this.geolocation.getCurrentPosition(options)
      .then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.addCurrentLocation(this.lat, this.lng);
      }).catch((error) => {
        console.log('Error getting location', error);
        this.showAlert();
      });
  }

  loadMembers() {
    this.memberService.getMembers()
      .then(
      (members) => {
        this.members = members;
      }
      ).catch(
      error => console.log(error)
      );
  }

  addCurrentLocation(lat:number, lng:number) {
    
  }


}
