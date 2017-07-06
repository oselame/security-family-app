import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigurationServices } from './../../services/configuration-services';

import { Configuration } from './../../models/configuration-model';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  configuration: Configuration = new Configuration();

  constructor(public viewController: ViewController,
    private configService : ConfigurationServices) {
  }

  ionViewWillEnter() {
    this.configService.getConfiguration()
      .then(
        config => this.configuration = config
      );
  }

  onSaveConfig(config: Configuration) {
    this.configService.saveConfiguration(config)
      .then(
        sucess => {
          this.viewController.dismiss();
        }
      ).catch(
        error => console.log(error)
      );
  }

}
