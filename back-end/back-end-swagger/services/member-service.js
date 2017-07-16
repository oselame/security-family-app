'use strict';

var db = require('../dbconnections.js');

class MemberService {
    
    constructor() {}

    getAllMembers(callback) {
        console.log("MemberService.getAllMembers");
        return db.query("select * from esefmember", callback);
    }

    getMemberByName(name, callback) {
        console.log("MemberService.getMemberByName: " + name);
        return db.query("select * from esefmember where name = ?", [name], callback);
    }

    saveMember(member, callback) {
        console.log("MemberService.saveMember: " + JSON.stringify(member));
        return db.query("insert into esefmember (name, fone) VALUES (?,?)", 
                        [member.name, member.fone], 
                        callback);
    }

    updateMember(member, callback) {
        console.log("MemberService.updateMember: " + JSON.stringify(member));
        return db.query("update esefmember set name = ?, fone = ? where id = ?", 
                        [member.name, member.fone, member.id], 
                        callback);
    }

}

module.exports = new MemberService();