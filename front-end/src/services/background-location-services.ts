import { Injectable } from '@angular/core';

import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { ConfigurationServices } from './configuration-services';

import { Configuration } from './../models/configuration-model';

@Injectable()
export class BackgroudLocationServices {

    urlApi = 'http://oselame.ddns.net:3000/api/v1/location'; 
    syncUrlApi = 'http://oselame.ddns.net:3000/api/v1/sync'; 
    
    logs:any = '';
    teste:string = "";
    name : 'adriano';

    locations:any;
    configuration: Configuration;

  constructor(public backgroundGeolocation: BackgroundGeolocation,
    public configurationServices: ConfigurationServices) {
    
    this.loadConfiguration();
    /*
    this.backgroundGeolocation.configure(this.config).subscribe(
      (location: BackgroundGeolocationResponse) => {
        res => console.log(res)      
      }
    );
    this.backgroundGeolocation.watchLocationMode().then(
      res => console.log(res)      
    ).catch(
      error => console.log(error)
    )
    */
  }

  startBackgroundGeolocation() {
    this.backgroundGeolocation.start();
    console.log("teste");
  }

  stopBackgroundGeolocation() {
    this.backgroundGeolocation.stop();
  }

  getBackgroundGeolocationConfig(name) {
      let config: BackgroundGeolocationConfig = {
              stationaryRadius: 20,
              distanceFilter: 30,
              desiredAccuracy: 10,
              debug: false,
              notificationTitle: 'Background tracking',
              notificationText: 'enabled',
              notificationIconColor: '#FEDD1E',
              notificationIconLarge: 'mappointer_large',
              notificationIconSmall: 'mappointer_small',
              locationProvider: 0,//backgroundGeolocation.provider.ANDROID_DISTANCE_FILTER_PROVIDER,
              interval: 10,
              fastestInterval: 5,
              activitiesInterval: 10,
              stopOnTerminate: false,
              startOnBoot: false,
              startForeground: true,
              stopOnStillActivity: true,
              activityType: 'AutomotiveNavigation',
              url: this.urlApi,
              syncUrl: this.syncUrlApi,
              syncThreshold: 100,
              httpHeaders: { 'name': name },
              pauseLocationUpdates: false,
              saveBatteryOnBackground: false,
              maxLocations: 100
      };
      return config;
  };


  getLocations() {
    if (this.locations) {
      return Promise.resolve(this.locations);
    }
    return new Promise(resolve => {
        this.backgroundGeolocation.getLocations()
        .then(
            locationsParam => {
              this.locations = locationsParam; 
              resolve(locationsParam);
            }
        )
        .catch(
            error => console.log(error)
        )
    });
     
  }

  deleteLocation(locationId:  number) {
    this.backgroundGeolocation.deleteLocation(locationId)
      .then( 
        res => console.log(res)
       )
      .catch(
        error => console.log(error)
      );
  }

  loadConfiguration() {
    this.configurationServices.getConfiguration()
      .then(
        configParam => {
          this.configuration = configParam;
          
          let backgroundGeolocationConfig = this.getBackgroundGeolocationConfig(this.configuration.name);

          this.backgroundGeolocation.configure(backgroundGeolocationConfig).subscribe(
            (location: BackgroundGeolocationResponse) => {
              res => console.log(res)      
            }
          );
          this.backgroundGeolocation.watchLocationMode().then(
            res => console.log(res)      
          ).catch(
            error => console.log(error)
          )


        }
      ).catch(
        error => console.log(error)
      );
  }

 
}
