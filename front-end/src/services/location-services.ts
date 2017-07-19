import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Location } from './../models/location-model';

@Injectable()
export class LocationServices {

  urlApi = 'http://oselame.ddns.net:3000/api/v1/';
  
  endPointLocation = this.urlApi +'location';
  
  locations:any;

  constructor(public http: Http) {
    console.log('LocationServices Provider');
  }

  getLocations():Promise<Location[]> {
    console.log("LocationServices.getLocations()");    
    return new Promise(resolve => {
      this.http.get(this.endPointLocation)
        .map(res => res.json())
        .subscribe(data => {
            this.locations = data || [];
            resolve(this.locations);
        });

    });
  }

  getLocationsByName(memberid: string) {
    return new Promise(resolve => {
      this.http.get(this.endPointLocation + '/' + memberid)
        .map(res => res.json())
        .subscribe(data => {
            this.locations = data || [];
            resolve(this.locations);
        });

    });
  }

}
