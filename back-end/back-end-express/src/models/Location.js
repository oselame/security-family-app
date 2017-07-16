 var db = require('../dbconnections.js');

var Location = {
    getAllLocations: function(callback) {
        console.log("getAllLocations");
        return db.query("select * from eseflocation", callback);
    },
    
    getLocationsByName: function(name, callback) {
        console.log(name);
        return db.query("select * from eseflocation where name = ?", [name], callback);
    },
    getLocationsByNameToday: function(name, callback) {
        console.log(name);
        return db.query("select * from eseflocation " + 
                        "where name = ?" + 
                        "and time > CURDATE()", [name], callback);
    }
    ,
    
    saveLocation: function(location, callback) {
        loc = location[0];
        console.log("Location: " + JSON.stringify(loc));
        return db.query("insert into eseflocation (id, provider, time, latitude, longitude, accuracy, altitude, locationProvider, name, speed, bearing) VALUES (?,?,?,?,?,?,?,?,?,?,?)", 
                        [loc.id, loc.provider, loc.time, loc.latitude, loc.longitude, loc.accuracy, 
                        loc.altitude, loc.locationProvider, loc.name, loc.speed, loc.bearing], 
                        callback);
    }
}

module.exports=Location;