import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Member } from './../models/member-model';
import { UUID } from 'angular2-uuid';


@Injectable()
export class MemberServices {
  private dbName : string = 'memberdb';

  private members : Member[] = [];

  constructor(public storage: Storage) {
    console.log('Hello MemberServices Provider');
  }

  addNewMember(member : Member) {
    member.location = {lat: 0, lng: 0};
    member.id = UUID.UUID();
    this.getMembers().then(
      members => this.members = members
    );
    console.log(this.members);
    this.members.push(member);
    this.storage.set(this.dbName, this.members);
  }

  deleteMember(id: string) {

  }

  getMembers() {
    return this.storage.get(this.dbName)
      .then(
        (members) => {
           this.members = members == null ? [] : members;
          return this.members;
          //return this.createMembers().slice();
        }
      ).catch(
        (error) => {
          console.log(error);
          return [];
        }
      );
  }

  addCurrentLocation(memberid:string, lat:number, lng:number) {

  }

}
