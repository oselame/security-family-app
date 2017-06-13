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

  addNewLocation(memberid: string) {
    //this.getLocations(memberid)
  }

  getLocations(memberid: string) {
    return this.storage.get(this.dbName)
      .then()
      .catch();
  }

}
