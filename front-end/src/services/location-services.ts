import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LocationServices {

  urlApi = 'http://oselame.ddns.net:3000/api/v1/';
  //http://oselame.ddns.net:3000/api/v1/location

  locations:any;

  constructor(public http: Http) {
    console.log('LocationServices Provider');
  }

  getLocations(memberid: string) {
    // let url = this.urlApi + 'location';
    // console.log("Url: " + url);
    // this.locations = [];
    // if (this.locations) {
    //   return Promise.resolve(this.locations);
    // }

    return new Promise(resolve => {
      this.http.get("http://oselame.ddns.net:3000/api/v1/location")
        .map(res => res.json())
        .subscribe(data => {
            this.locations = data || [];
            resolve(this.locations);
        });

    });
  }

}
