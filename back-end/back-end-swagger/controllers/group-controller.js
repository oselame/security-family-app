'use strict';

var GroupService = require('../services/group-service');

class GroupController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getAllGroups.bind(this));
        this.router.get('/:id', this.getAllGroupsByMember.bind(this));
        this.router.post('/', this.saveGroup.bind(this) );
        this.router.put('/', this.updateGroup.bind(this) );
    }

    getAllGroups(req, res) {
        console.log("GroupController.getAllGroups()");
        GroupService.getAllGroups(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }

    getAllGroupsByMember(req, res) {
        console.log("GroupController.getAllGroupsByMember()");
        if (!req.params.idmember) {
            res.setHeader('Location', '/group/' + req.headers.idmember);
            res.sendStatus(500);
        }
        console.log("param: " + req.params.idmember);
        GroupService.getAllGroupsByMember(req.params.idmember, 
            function(err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows)
                }
            }
        );
    }

    saveGroup(req, res) {
        console.log("GroupController.saveGroup(): " + JSON.stringify(req.body) );
        GroupService.saveGroup(req.body, function(err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        });
    }

    updateGroup(req, res) {
        console.log("GroupController.updateGroup(): " + JSON.stringify(req.body) );
        GroupService.updateGroup(req.body, function(err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        });
    }
}

module.exports = GroupController;