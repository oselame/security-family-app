import { Member } from './../models/member-model';
import { MemberServices } from './../services/member-services';
import { Injectable } from '@angular/core';

import { Md5 } from 'ts-md5/dist/md5'

@Injectable()
export class HomeProvider {

  members:Member[] = [];

  constructor(private memberServices: MemberServices) {
    
  }

  loadMembers() {
    this.memberServices.getMembers()
      .then(
        members => this.members = members
      );
  }

  getAvatar(email: string) {
    return 'https://www.gravatar.com/avatar/' + Md5.hashStr(email);
  }


}
