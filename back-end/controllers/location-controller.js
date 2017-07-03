'use strict';

var LocationService = require('../services/location-service');

class LocationController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getLocations.bind(this));
        this.router.get('/:name', this.getLocationsByName.bind(this));
        this.router.post('/', this.postLocation.bind(this));
    }

    getLocations(req, res) {
        console.log("getLocations");
        var locations = LocationService.getLocations();
        res.send(locations);
    }

    postLocation(req, res) {
        var locationInfo = req.body;
        if (!!req.headers.name) {
            locationInfo[0].name = req.headers.name;
        }
        if (LocationService.addLocation(locationInfo)) {
            res.setHeader('Location', '/location/' + req.headers.name);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }

    getLocationsByName(req, res) {
        console.log("getLocationsByName");
        if (!req.params.name) {
            res.setHeader('Location', '/location/' + req.headers.name);
            res.sendStatus(500);
        }
        var locations = LocationService.getLocationsByName(req.params.name);
        res.send(locations);
    }

}

module.exports = LocationController;