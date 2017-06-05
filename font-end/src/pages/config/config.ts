import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';
import { ConfigurationServices } from './../../services/configuration-services';

import { Configuration } from './../../models/configuration-model';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {

  constructor(public viewController: ViewController,
    public configService : ConfigurationServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigPage');
  }

  onSaveConfig(config: Configuration) {
    this.configService.saveConfiguration(config);
    this.viewController.dismiss();
  }

}
