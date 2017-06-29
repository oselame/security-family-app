'use strict';

var LocationService = require('../services/location-service');

class LocationController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getLocations.bind(this));
        this.router.post('/', this.postLocation.bind(this));
        this.router.get('/:name', this.getLocationsByName.bind(this));
        this.router.get('/:name/:date', this.getLocationsByNameDate.bind(this));
    }

    getLocations(req, res) {
        var locations = LocationService.getLocations();
        res.send(locations);
    }

    postLocation(req, res) {
        var locationInfo = req.body;
        if (LocationService.addLocation(locationInfo)) {
            res.setHeader('Location', '/location/' + locationInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }

    getLocationsByName(req, res) {
        var name = req.params.name;
        var locations = LocationService.getLocationsByName(name);
        if (!locations) {
            res.sendStatus(404);
        } else {
            res.send(locations);
        }
    }

    getLocationsByNameDate(req, res) {
        var name = req.params.name;
        var date = req.params.date;
        var locations = LocationService.getLocationsByNameDate(name, date);
        if (!locations) {
            res.sendStatus(404);
        } else {
            res.send(locations);
        }
    }

}

module.exports = LocationController;