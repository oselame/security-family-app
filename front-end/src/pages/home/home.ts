import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LocationServices } from './../../services/location-services';
import { BackgroudLocationServices } from './../../services/background-location-services';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  lat: number = -27.680038;
  lng: number = -48.644711;
  started:boolean = false;
  locations:any;
  msg: string = "xxx";

  constructor(public navCtrl: NavController, 
    public locationServices: LocationServices,
    public backgroudLocationServices: BackgroudLocationServices) {
  }

  startBackgroundGeolocation() {
    this.msg = "Starting";
    this.started = true;
    this.backgroudLocationServices.startBackgroundGeolocation();
  }

  stopBackgroundGeolocation() {
    this.msg = "Stopping";
    this.started = false;
    this.backgroudLocationServices.stopBackgroundGeolocation();
  }

  getLocations() {
    this.msg = "Get Locations";
    console.log("Get locations");
    let name: string = 'adriano';
    this.locationServices.getLocations(name)
      .then(
        locs => {
          this.locations = locs;
          this.msg = "locs";
        }
      ).catch(
        errors => {
          console.log(errors);
          this.msg = "errors";
        }
      );
  }
/*
  getLocations2() {
    console.log("Get locations");
    this.backgroudLocationServices.getLocations()
        .then(
            locs => {
              this.locations = locs;
            }
        )        
        .catch(
            errors => {
              console.log(errors);
            }
        );
  }
*/
}
