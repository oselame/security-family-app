'use strict';

var uuid = require('node-uuid');

class LocationService {
    constructor() {
        this.locations = [];
    }

    getLocations() {
        return this.locations;
    }

    getLocationsByName(name) {
        return this.locations.filter(loc => loc.name.toUpperCase() == name.toUpperCase());
    }

    addLocation(location) {
        this.locations.push(location[0]);
        console.log("Regs: " + location.length);
        return true;
    }
}

module.exports = new LocationService();