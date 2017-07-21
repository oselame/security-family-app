'use strict';

var db = require('../dbconnections.js');

class MemberService {
    
    constructor() {}

    getAllMembers(callback) {
        console.log("MemberService.getAllMembers");
        return db.query("select * from esefmember", callback);
    }

    getMemberById(id, callback) {
        console.log("MemberService.getMemberById: " + id);
        return db.query("select * from esefmember where id = ?", [id], callback);
    }

    getMemberByEmail(email, callback) {
        console.log("MemberService.getMemberByEmail: " + email);
        return db.query("select * from esefmember where email = ?", [email], callback);
    }

    getMemberByName(name, callback) {
        console.log("MemberService.getMemberByName: " + name);
        return db.query("select * from esefmember where name = ?", [name], callback);
    }

    saveMember(member, callback) {
        console.log("MemberService.saveMember: " + JSON.stringify(member));
        return db.query("insert into esefmember (name, fone, email) VALUES (?,?,?)", 
                        [member.name, member.fone, member.email], 
                        callback);
    }

    updateMember(member, callback) {
        console.log("MemberService.updateMember: " + JSON.stringify(member));
        return db.query("update esefmember set name = ?, fone = ?, email = ? where id = ?", 
                        [member.name, member.fone, member.email, member.id], 
                        callback);
    }

    deleteMember(id, callback) {
        console.log("MemberService.deleteMember: " + id);
        return db.query("delete from esefmember where id = ?", [id], callback);
    }

}

module.exports = new MemberService();