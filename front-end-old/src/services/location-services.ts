import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Location } from './../models/location-model';

@Injectable()
export class LocationServices {
  private dbName: string = 'locationdb';
  private locations: Location[] = [];


  constructor(private storage: Storage) {
    console.log('LocationServices Provider');
  }

  addNewLocation(location: Location) {
    //this.getLocations(memberid)
    console.log(location);
  }

  getLocations(memberid: string) {
    return this.storage.get(this.dbName)
      .then(
        locationParams => this.locations = locationParams
      ).catch(
        error => {
          console.log(error);
          this.locations = [];
        }
      );
  }

}
