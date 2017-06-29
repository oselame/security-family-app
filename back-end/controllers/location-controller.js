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
       // this.router.put('/:id', this.putPlayer.bind(this));
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



/*getSinglePlayer(req, res) {
        var id = req.params.id;
        var player = PlayersService.getSinglePlayer(id);
        if (!player) {
            res.sendStatus(404);
        } else {
            res.send(player);
        }
    }

    putPlayer(req, res) {
        var id = parseInt(req.params.id, 10);
        var existingPlayer = PlayersService.getSinglePlayer(id);
        if (!existingPlayer) {
            var playerInfo = req.body;
            playerInfo.id = id;
            if (PlayersService.addPlayer(playerInfo)) {
                res.setHeader('Location', '/players/' + id);
                res.sendStatus(201);
            } else {
                res.sendStatus(500);
            }
        } else {
            if (PlayersService.updatePlayer(id, req.body)) {
                res.sendStatus(204);
            } else {
                res.sendStatus(404);
            }
        }
    }

    postPlayer(req, res) {
        var playerInfo = req.body;
        if (PlayersService.addPlayer(playerInfo)) {
            res.setHeader('Location', '/players/' + playerInfo.id);
            res.sendStatus(200);
        } else {
            res.sendStatus(500);
        }
    }
    */
}

module.exports = LocationController;