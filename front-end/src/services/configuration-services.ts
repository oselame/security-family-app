import { Injectable } from '@angular/core';

import { AppPreferences } from '@ionic-native/app-preferences';
import { Configuration } from './../models/configuration-model';
import { Config } from './../config/config';


@Injectable()
export class ConfigurationServices {

  constructor(private appPreferences: AppPreferences) {}

  saveConfiguration(configuration: Configuration):Promise<any> {
    return new Promise((resolve, reject) => {
      this.appPreferences.store(Config.SECURITYDB, Config.USER, configuration)
        .then( () => resolve(true) )
        .catch( error => {
          console.log(error);
          reject(false) 
        });
    })
  }

  getConfiguration():Promise<Configuration> {
    return new Promise(resolve => {
      this.appPreferences.fetch(Config.SECURITYDB, Config.USER)
        .then(config => resolve(config))
        .catch(error => console.log(error));
      });
  }

  existsConfigUser():Promise<boolean> {
    return new Promise( (resolve, reject) => {
      this.appPreferences.fetch(Config.SECURITYDB, Config.USER)
        .then(config => {
          if (!!config.name || !!config.fone) {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch(error => reject(false));
    });
  }
}
