import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Member } from './../models/member-model';

@Injectable()
export class MemberServices {

  members : Member[] = [];

  constructor(private storage: Storage) {
    console.log('Hello MemberServices Provider');
  }

  addNemMember(member : Member) {
    this.members.push(member);
    this.storage.set('memberdb', this.members.slice());
    console.log("New member add with success.", this.members);
  }

  getMembers() {
    /*
    this.storage.get('members')
      .then(
        (member) => {
          console.log(member)
        }
      ).catch(
        (error) => console.log(error)
      );
      */
  }
}
