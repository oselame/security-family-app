'use strict';

var uuid = require('node-uuid');

class LocationService {
    constructor() {
        this.locations = [];
    }

    getDate() {
        var data = new Date();
        var ano = data.getFullYear();
        var mes = data.getMonth() + 1;
        var dia = data.getDay();
        mes = mes < 10 ? "0" + mes : mes;
        dia = dia < 10 ? "0" + dia : dia;
        return parseInt("" + ano + mes + dia);
    }

    getTime() {
        var data = new Date();
        return data.getTime();
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
        //location.id = uuid.v4();
        location.date = this.getDate();
        location.time = this.getTime();
        location.name = location.name.toUpperCase();
        location.latitude = parseFloat(location.latitude);
        location.longitude = parseFloat(location.longitude);
        this.locations.push(location);
        return true;
    }

    getLocationsByName(name) {
        if (!name) {
            return false;
        }
        var lcs = this.locations.filter( loc => (loc.name === name.toUpperCase()));
        return lcs || null;
    }

    getLocationsByNameDate(name, date) {
        if (!name || !date) {
            return false;
        }
        var lcs = this.locations.filter( loc => (loc.name === name.toUpperCase() && loc.date === date));
        return lcs || null;
    }
}

module.exports = new LocationService();