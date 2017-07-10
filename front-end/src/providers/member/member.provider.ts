import { Injectable } from '@angular/core';

import { MemberServices } from './../../services/member-services';

import { Member } from './../../models/member-model';


@Injectable()
export class MemberProvider {

  members: Member[] = [];

  constructor(public memberServices: MemberServices) {
    
  }

  addNewMember(member: Member):Promise<any> {
    return new Promise((resolve, reject) => {
      this.memberServices.addNewMember(member)
        .then( retorno => resolve(retorno))
        .catch( error => reject(error));
    });
  }

  getAllMembers() {
    this.memberServices.getMembers().then(members => this.members);
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

}
