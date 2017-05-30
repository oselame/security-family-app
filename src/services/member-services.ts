import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Member } from './../models/member-model';

@Injectable()
export class MemberServices {
  private dbName : string = 'memberdb';

  private members : Member[] = [];

  constructor(public storage: Storage) {
    console.log('Hello MemberServices Provider');
  }

  addNemMember(member : Member) {
    member.location = {lat: 0, lng: 0};
    this.members.push(member);
    console.log(this.members.length);    
    this.storage.set(this.dbName, this.members);
  }

  getMembers() {
    return this.storage.get('members')
      .then(
        (members) => {
           this.members = members == null ? [] : members;
          //this.members = this.createMembers()
          return this.createMembers().slice();
        }
      ).catch(
        (error) => {
          console.log(error);
          return [];
        }
      );
  }

  createMembers() {
    return [
      {
        name : "Adriano Oselame",
        fone : "(48) 98403-2497",
        location: {
            lat: -27.680143,
            lng: -48.644707
        }
      }, {
        name : "Lidiane Alves Espindola Oselame",
        fone : "(48) 98403-2498",
        location: {
            lat: -27.634970,
            lng: -48.652832
        }
      }, {
        name : "Adriana Espindola Oselame",
        fone : "(48) 98403-2498",
        location: {
            lat: -27.594031,
            lng: -48.543433
        }
      }, {
        name : "Gustavo Espindola Oselame",
        fone : "(48) 98403-2498",
        location: {
            lat: -27.594031,
            lng: -48.533433
        }
      }
    ]
  }
}
