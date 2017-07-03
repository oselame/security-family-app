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
    public configService : ConfigurationServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  ionViewWillEnter() {
    this.configService.existsConfiguration().then(
      retorno => {
          if (retorno) {
            this.configService.getConfiguration().then(
              config => {
                this.configuration.name = config.name;
                this.configuration.fone = config.fone;
                this.configuration.gravatar = config.gravatar;
              }
            )
          }
      }
    )
  }

  onSaveConfig(config: Configuration) {
    this.configService.saveConfiguration(config);
    this.viewController.dismiss();
  }

}
