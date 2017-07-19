'use strict';

var db = require('../dbconnections.js');

class LocationService {
    
    constructor() {}

    getAllLocations(callback) {
        console.log("LocationService.getAllLocations");
        return db.query("select * from eseflocation", callback);
    }

    getLocationsByName(name, callback) {
        console.log("LocationService.getLocationsByName: " + name);
        return db.query("select * from eseflocation where name = ?", [name], callback);
    }

    getLocationsByNameToday(name, callback) {
        console.log("LocationService.getLocationsByNameToday: " + name);
        return db.query("select * from eseflocation " + 
                        "where name = ?" + 
                        "and time > CURDATE()", [name], callback);
    }

    saveLocation(location, callback) {
        var loc = location[0];
        console.log("LocationService.saveLocation: " + JSON.stringify(loc));
        return db.query("insert into eseflocation (provider, time, latitude, longitude, accuracy, altitude, locationProvider, name, speed, bearing) VALUES (?,?,?,?,?,?,?,?,?,?)", 
                        [loc.provider, loc.time, loc.latitude, loc.longitude, loc.accuracy, 
                        loc.altitude, loc.locationProvider, loc.name, loc.speed, loc.bearing], 
                        callback);
    }

}

module.exports = new LocationService();