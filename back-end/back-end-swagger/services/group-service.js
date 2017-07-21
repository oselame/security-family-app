'use strict';

var db = require('../dbconnections.js');

class GroupService {
    
    constructor() {}

    getAllGroups(callback) {
        console.log("GroupService.getAllGroups");
        return db.query("select * from esefgroup", callback);
    }

    getAllGroupsByMember(idmember, callback) {
        console.log("GroupService.getAllGroupsByMember");
        return db.query("select * from esefgroup where idmember = ?", [idmember], callback);
    }

    saveGroup(group, callback) {
        console.log("GroupService.saveGroup: " + JSON.stringify(group));
        return db.query("insert into esefgroup (idmember, idmemberprincipal, flactive) VALUES (?,?,?)", 
                        [group.idmember, group.idmemberprincipal, 0], 
                        callback);
    }

    updateGroup(group, callback) {
        console.log("GroupService.updateGroup: " + JSON.stringify(group));
        return db.query("update esefgroup set idmember = ?, idmemberprincipal = ?, flactive = ? where id = ?", 
                        [group.idmember, group.idmemberprincipal, group.flactive, group.id], 
                        callback);
    }

}

module.exports = new GroupService();