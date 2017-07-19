import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { NewMemberPage } from './../new-member/new-member';

import { MemberProvider } from './../../providers/member.provider';

@Component({
  selector: 'page-member-list',
  templateUrl: 'member-list.html',
})
export class MemberListPage {

  constructor(public navCtrl: NavController, 
    public provider: MemberProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MemberListPage');
  }

  ionViewDidEnter() {
    this.getAllMembers();
  }

  getAllMembers() {
    this.provider.getAllMembers();
  }

  addNewMember() {
    this.navCtrl.push(NewMemberPage);
  }

  onClosePage() {
    this.navCtrl.pop();
  }

}
