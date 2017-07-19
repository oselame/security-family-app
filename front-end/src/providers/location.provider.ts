import { Injectable } from '@angular/core';

import { LocationServices } from './../services/location-services';
import { Location } from './../models/location-model';

@Injectable()
export class LocationProvider {

  locations:Location[] = [];

  constructor(public locationServices: LocationServices) {
    
  }

  loadLocations() {
    console.log("LocationProvider.getLocations()");    
    this.locationServices.getLocations()
      .then(locs => this.locations = locs || [])
      .catch(error => console.log(error))
  }

}
