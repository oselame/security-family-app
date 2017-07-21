import { Component } from '@angular/core';

import { ViewController } from 'ionic-angular';

import { ConfigProvider } from './../../providers/config.provider';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html',
})
export class ConfigPage {
  constructor(public viewController: ViewController,
    public provider : ConfigProvider) {
  }

  ionViewWillEnter() {
    this.provider.loadConfiguration();
  }

  onSaveConfig() {
    this.provider.saveConfiguration()
      .then(
        () => this.viewController.dismiss()
      );
  }

}
