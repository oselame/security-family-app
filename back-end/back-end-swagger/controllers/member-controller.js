'use strict';

var MemberService = require('../services/member-service');

class MemberController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getAllMembers.bind(this));
        this.router.get('/:name', this.getAllMembersByName.bind(this));
        this.router.post('/', this.saveMember.bind(this) );
        this.router.put('/', this.updateMember.bind(this) );
    }

    getAllMembers(req, res) {
        console.log("MemberController.getAllMembers()");
        MemberService.getAllMembers(function(err, rows) {
            if (err) {
                res.json(err);
            } else {
                res.json(rows);
            }
        });
    }

    getAllMembersByName(req, res) {
        console.log("MemberController.getAllMembersByName()");
        if (!req.params.name) {
            res.setHeader('Location', '/member/' + req.headers.name);
            res.sendStatus(500);
        }
        console.log("param: " + req.params.name);
        MemberService.getAllMembersByName(req.params.name, 
            function(err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows)
                }
            }
        );
    }

    saveMember(req, res) {
        console.log("MemberController.saveMember(): " + JSON.stringify(req.body) );
        MemberService.saveMember(req.body, function(err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        });
    }

    updateMember(req, res) {
        console.log("MemberController.updateMember(): " + JSON.stringify(req.body) );
        MemberService.updateMember(req.body, function(err, count) {
            if (err) {
                res.json(err);
            } else {
                res.json(count);
            }
        });
    }
}

module.exports = MemberController;