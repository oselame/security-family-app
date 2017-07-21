import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppPreferences } from '@ionic-native/app-preferences';
import { Configuration } from './../models/configuration-model';
import { Config } from './../config/config';

import { MemberServices } from './member-services';

@Injectable()
export class ConfigurationServices {

  endPointMember = Config.SERVER.urlapi + Config.SERVER.member;

  constructor(
    private appPreferences: AppPreferences,
    private memberServices: MemberServices) {}

  saveConfiguration(configuration: Configuration):Promise<Configuration> {
    return new Promise(resolve => {
      this.appPreferences.store(Config.SECURITYDB, Config.USER, configuration)
        .then( config => resolve(config) );
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
