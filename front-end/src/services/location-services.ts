import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

import { Storage } from '@ionic/storage';
import { Location } from './../models/location-model';

@Injectable()
export class LocationServices {
  //private dbName: string = 'locationdb';
  //private locations: Location[] = [];

  server:string = 'https://arcane-mesa-62462.herokuapp.com/api/v1/'; 

  constructor(private storage: Storage, private http: HTTP) {
    console.log('LocationServices Provider');
  }

  addNewLocation(location: Location) {
    //this.getLocations(memberid)
    console.log(location);
  }

  getLocations(memberid: string) {
    memberid = "ADRIANO";
    this.http.get(this.server + '/location/' + memberid, {}, {}).then(
        locations => {
          console.log(locations)
        }
      ).catch(
        error => console.log(error)
      );
    // return this.storage.get(this.dbName)
    //   .then(
    //     locationParams => this.locations = locationParams
    //   ).catch(
    //     error => {
    //       console.log(error);
    //       this.locations = [];
    //     }
    //   );
  }

}
