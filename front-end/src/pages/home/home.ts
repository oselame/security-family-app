import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { PrincipalPage } from './../principal/principal';

import { HomeProvider } from './../../providers/home.provider';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              public provider: HomeProvider) {
  }

  ionViewWillEnter() {
    this.provider.loadMembers();
  }

  localizar(id: number) {
    this.navCtrl.push(PrincipalPage, {idmember: id});
  }


}
