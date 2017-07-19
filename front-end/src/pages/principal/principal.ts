import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Geolocation } from '@ionic-native/geolocation';

import { BackgroudLocationServices } from './../../services/background-location-services';
import { LocationProvider } from './../../providers/location.provider';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  lat: number = -0;
  lng: number = -0;
  started:boolean = false;
  locations:any;
  
  constructor(public navCtrl: NavController, 
    public backgroudLocationServices: BackgroudLocationServices,
    public geolocation: Geolocation,
    public locationProvider: LocationProvider,
    //public configurationServices: ConfigurationServices
    ) {
      let geoLocationOptions = { 
              maximumAge: 3000, 
              timeout: 10000, 
              enableHighAccuracy: true 
            };
      this.geolocation.getCurrentPosition(geoLocationOptions)
        .then((resp) => {
          this.lng = resp.coords.longitude;
          this.lat = resp.coords.latitude;
          console.log("Coors: ", resp.coords.latitude, " / ", resp.coords.longitude);
        }).catch((error) => {
          console.log("Error " + error.message);
        });
  }

  startBackgroundGeolocation() {
    this.started = true;
    this.backgroudLocationServices.startBackgroundGeolocation();
  }

  stopBackgroundGeolocation() {
    this.started = false;
    this.backgroudLocationServices.stopBackgroundGeolocation();
  }

  getLocations() {
    console.log("PrincipalPage.getLocations()");
    this.locationProvider.loadLocations();
  }


}
