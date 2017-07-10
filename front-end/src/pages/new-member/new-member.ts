import { Component } from '@angular/core';

import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { MemberProvider } from './../../providers/member/member.provider';
import { Member } from './../../models/member-model';

@Component({
  selector: 'page-new-member',
  templateUrl: 'new-member.html',
})
export class NewMemberPage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public viewController: ViewController,
    private alertCtrl: AlertController,
    public provider: MemberProvider) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMemberPage');
  }


  onClosePage() {
    this.navCtrl.pop();
  }

  onAddNewMember(member: Member) {
    this.provider.addNewMember(member)
      .then( () =>  this.onClosePage())
      .catch( () => this.openAlertErroSalvar())
  }

  openAlertErroSalvar(){
    let alert = this.alertCtrl.create({
            title: "New Member",
            subTitle: "Error to save a member",
            buttons: [{
              text: 'Ok'
            }]
        });
    alert.present();
  }

}
