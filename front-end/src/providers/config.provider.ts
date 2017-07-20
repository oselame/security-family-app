import { Injectable } from '@angular/core';

import { ConfigurationServices } from './../services/configuration-services';
import { Configuration } from './../models/configuration-model';

@Injectable()
export class ConfigProvider {
  
  configuration: Configuration = new Configuration();

  constructor(private configurationServices: ConfigurationServices) {
    
  }

  loadConfiguration() {
    this.configurationServices.getConfiguration()
      .then(
        config => this.configuration = config
      );
  }

  saveConfiguration():Promise<boolean> {
    return new Promise( resolve => {
      this.configurationServices.saveConfiguration(this.configuration)
        .then(
          sucess => resolve(true)
        ).catch (
          error => resolve(false)
        );
    });
  }

}
