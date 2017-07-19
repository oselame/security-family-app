'use strict';

var db = require('../dbconnections.js');

class SyncService {
    constructor() {
    }

    getAllLocations(callback) {
        return db.query("select * from esefsync", callback);
    }

    addLocation(location, callback) {
        return db.query("insert into esefsync (deSysnc) VALUES (?)", [location]);
    }
}

module.exports = new SyncService();