import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewMemberPage } from './../new-member/new-member';
import { MemberServices } from './../../services/member-services';
import { Member } from './../../models/member-model';

@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html',
})
export class MemberListPage {

  members: Member[] = [];

  constructor(public navCtrl: NavController, public memberServices: MemberServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberListPage');
  }

  ionViewDidEnter() {
    this.getMembers();
  }

  getMembers() {
    this.memberServices.getMembers()
      .then(
         (members) => {
           this.members = members
         }
      )
      .catch(
        error => console.log(error)
      );
  }

  addNewMember() {
    this.navCtrl.push(NewMemberPage);
  }

  onClosePage() {
    this.navCtrl.pop();
  }

}
