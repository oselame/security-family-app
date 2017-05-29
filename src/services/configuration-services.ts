import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Configuration } from './../models/configuration-model';


@Injectable()
export class ConfigurationServices {
  
  dbName : string = 'config';
  
  configuration : Configuration = new Configuration();

  constructor(private storage: Storage) {}

  saveConfiguration(configuration : Configuration) {
    this.storage.set(this.dbName, configuration);
    console.log("Configuration saved.");
  }

  existsConfiguration() {
    return this.storage.get(this.dbName)
      .then(
        (config) => {
          let ret = config == null ? false : true;
          console.log("ConfigurationServices.config is " + ret);
          return ret;
        }
      ).catch(
        (error) => {
          console.log("ConfigurationServices.error is " + error);
          return false;
        }
      );
  }

  getConfiguration() {
    return this.storage.get(this.dbName)
      .then(
        (config) => {
          return this.configuration == null ? new Configuration() : config;
        }
      ).catch(
        (error) => {
          console.log(error);
          return new Configuration();
        }
      );
  }
}
