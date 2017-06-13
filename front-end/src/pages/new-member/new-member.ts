import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';

import { MemberServices } from './../../services/member-services';
import { Member } from './../../models/member-model';

@Component({
  selector: 'page-new-member',
  templateUrl: 'new-member.html',
})
export class NewMemberPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewController: ViewController, public memberServices: MemberServices) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewMemberPage');
  }


  onClosePage() {
    //this.viewController.dismiss();
    this.navCtrl.pop();
  }

  onAddNewMember(member: Member) {
    this.memberServices.addNewMember(member);
    this.onClosePage();
  }

}
