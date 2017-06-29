'use strict';

var uuid = require('node-uuid');

class LocationService {
    constructor() {
        this.locations = [];
    }

    getLocations() {
        return this.locations;
    }

    addLocation(location) {
        if (!location || this.locations.filter(loc => (loc.name === location.name 
                    && loc.longitude === location.longitude
                    && loc.latitude === location.latitude)).length > 0) {
            return false;
        }
        location.id = uuid.v4();
        location.datetime = new Date();

        this.locations.push(location);

        console.log(this.locations);
        return true;
    }

    getLocationsByName(name) {
        if (!name) {
            return false;
        }
        var lcs = this.locations.filter( loc => (loc.name === name));
        return lcs || null;
    }

/*
    getSinglePlayer(playerId) {
        var player = this.players.filter(p => p.id === playerId)[0];

        return player || null;
    }

    addPlayer(info) {
        // prevent a bit of bad/duplicate data
        if (!info || this.players.filter(p => (p.firstName === info.firstName && p.lastName === info.lastName)).length > 0) {
            return false;
        }

        info.id = uuid.v4();

        this.players.push(info);
        return true;
    }

    updatePlayer(playerId, info) {
        var player = this.getSinglePlayer(playerId);
        if (player) {
            player.firstName = info.firstName ? info.firstName : player.firstName;
            player.lastName = info.lastName ? info.lastName : player.lastName;
            player.displayName = info.displayName ? info.displayName : player.displayName;

            return true;
        }
        return false;
    }
    */
}

module.exports = new LocationService();