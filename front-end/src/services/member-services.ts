import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppPreferences } from '@ionic-native/app-preferences';
import { Config } from './../config/config';

import { Member } from './../models/member-model';


@Injectable()
export class MemberServices {
  
  private members : Member[] = [];
  endPointMember = Config.SERVER.urlapi + Config.SERVER.member;

  constructor(private appPreferences: AppPreferences,
    private http: Http) {
    console.log('Hello MemberServices Provider');
  }

  addNewMember(member : Member):Promise<any> {
    return new Promise((resolve, reject) => {
      this.getMembers().then(
        members => {
          this.members = members;
          this.members.push(member);
          this.appPreferences.store(Config.SECURITYDB, Config.MEMBERS, this.members);
          resolve("true");
        }
      ).catch((error) => reject(error));
    });
  }

  deleteMember(id: string) {
  }

  getMembers():Promise<Member[]> {
   return new Promise(resolve => {
      this.http.get(this.endPointMember)
        .map(res => res.json())
        .subscribe(data => {
            this.members = data || [];
            resolve(this.members);
        });
      /*
      this.appPreferences.fetch(Config.SECURITYDB, Config.MEMBERS)
        .then(members => {
          if (!!members && !!members.length) {
            resolve(members);
          } 
        });
        */
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

  findMemberById(idmember: number):Promise<Member> {
    return new Promise(resolve => {
      let url = this.endPointMember + "/" + idmember;
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
             resolve(data || {});
        });
    });
  }

  findMemberByEmail(email: string):Promise<Member> {
    return new Promise(resolve => {
      let url = this.endPointMember + "/" + email + "/email";
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
             resolve(data || {});
        });
    });
  }

}
