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
        this.router.get('/:name/today', this.getLocationsByNameToday.bind(this));
        this.router.post('/', this.saveLocation.bind(this));
    }

    getLocations(req, res) {
        console.log("LocationController.getLocations()");
        LocationService.getAllLocations(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }

    getLocationsByName(req, res) {
        console.log("LocationController.getLocationsByName()");
        if (!req.params.name) {
            res.setHeader('Location', '/location/' + req.headers.name);
            res.sendStatus(500);
        }
        console.log("param: " + req.params.name);
        LocationService.getLocationsByName(req.params.name, 
            function(err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows)
                }
            }
        );
    }

    getLocationsByNameToday(req, res) {
        console.log("LocationController.getLocationsByNameToday()");
        if (!req.params.name) {
            res.setHeader('Location', '/location/' + req.headers.name);
            res.sendStatus(500);
        }
        console.log("param: " + req.params.name);
        LocationService.getLocationsByNameToday(req.params.name, 
            function(err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows);
                }
            }
        );
    }

    saveLocation(req, res) {
        LocationService.saveLocation(req.body, function(err, count) {
            if (err) {
                    res.json(err);
                } else {
                    res.json(count);
                } 
        })
    }

}

module.exports = LocationController;