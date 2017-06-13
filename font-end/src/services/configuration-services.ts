import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';

import { Configuration } from './../models/configuration-model';


@Injectable()
export class ConfigurationServices {

  dbName : string = 'configdb';

  configuration : Configuration = new Configuration();

  constructor(private storage: Storage) {}

  saveConfiguration(configuration : Configuration) {
    this.storage.set(this.dbName, configuration);
  }

  existsConfiguration() {
    return this.storage.get(this.dbName)
      .then(
        (config) => {
          return config == null ? false : true;
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
