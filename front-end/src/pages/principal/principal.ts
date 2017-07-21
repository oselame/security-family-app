import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-principal',
  templateUrl: 'principal.html',
})
export class PrincipalPage {

  lat: number = -0;
  lng: number = -0;
  started:boolean = false;
  locations:any;
  idmember:number;
  
  constructor(public navCtrl: NavController, 
    private navParams: NavParams
    ) {
      this.idmember = navParams.get("idmember");
  }

  ionViewWillEnter() {
    console.log("param2 " + this.idmember);
  }
}
