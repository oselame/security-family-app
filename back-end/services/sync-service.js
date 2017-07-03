'use strict';

var uuid = require('node-uuid');

class SyncService {
    constructor() {
        this.locations = [];
    }

    getLocations() {
        return this.locations;
    }

    addLocation(location) {
        console.log(location);
        this.locations.push(location);
        return true;
    }
}

module.exports = new SyncService();