'use strict';

var SyncService = require('../services/sync-service');

class LocationController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getLocations.bind(this));
        this.router.post('/', this.postLocation.bind(this));
    }

   getLocations(req, res) {
        console.log("LocationController.getLocations()");
        SyncService.getAllLocations(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }

    postLocation(req, res) {
        var locationInfo = req.body;
        if (SyncService.addLocation(locationInfo)) {
            res.setHeader('Location', '/sync/' + locationInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }

}

module.exports = LocationController;