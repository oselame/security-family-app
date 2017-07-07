import { Injectable } from '@angular/core';

import { AppPreferences } from '@ionic-native/app-preferences';
import { Config } from './../config/config';

import { Member } from './../models/member-model';
//import { UUID } from 'angular2-uuid';


@Injectable()
export class MemberServices {
  
  private members : Member[] = [];

  constructor(private appPreferences: AppPreferences) {
    console.log('Hello MemberServices Provider');
  }

  addNewMember(member : Member):Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.getMembers().then(
        members => {
          this.members = members;
          this.members.push(member);
          this.appPreferences.store(Config.SECURITYDB, Config.MEMBERS, this.members);
          resolve(true);
        }
      ).catch(() => reject(false));
    });
  }

  deleteMember(id: string) {
  }

  getMembers():Promise<Member[]> {
   return new Promise(resolve => {
      this.appPreferences.fetch(Config.SECURITYDB, Config.MEMBERS)
        .then(members => {
          if (!!members && !!members.length) {
            resolve(members);
          } 
        });
    });
  }

  existsMembers():Promise<boolean> {
    return new Promise( (resolve, reject) => {
      this.appPreferences.fetch(Config.SECURITYDB, Config.MEMBERS)
        .then(members => {
          if (!!members && !!members.length) {
            resolve(true);
          } else {
            reject(false);
          }
        })
        .catch(error => reject(false));
    });
  }

}
