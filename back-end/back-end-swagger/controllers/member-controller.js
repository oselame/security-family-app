'use strict';

var MemberService = require('../services/member-service');

class MemberController {
    constructor(router) {
        this.router = router;
        this.registerRoutes();
    }

    registerRoutes() {
        this.router.get('/', this.getAllMembers.bind(this));
        this.router.get('/:id', this.getMemberById.bind(this));
        this.router.get('/email/:email', this.getMemberByEmail.bind(this));

        this.router.post('/', this.saveMember.bind(this) );
        this.router.put('/', this.updateMember.bind(this) );
        this.router.delete('/:id', this.deleteMember.bind(this) );
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

    getMemberById(req, res) {
        console.log("MemberController.getAllMembersByName()");
        if (!req.params.id) {
            res.setHeader('Location', '/member/' + req.headers.id);
            res.sendStatus(500);
        }
        MemberService.getMemberById(req.params.id, 
            function(err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows)
                }
            }
        );
    }

    getMemberByEmail(req, res) {
        console.log("MemberController.getMemberByEmail()");
        if (!req.params.email) {
            res.setHeader('Location', '/member/email/' + req.headers.email);
            res.sendStatus(500);
        }
        MemberService.getMemberByEmail(req.params.email, 
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

    deleteMember(req, res) {
        console.log("MemberController.deleteMember()");
        if (!req.params.id) {
            res.setHeader('Location', '/member/' + req.headers.id);
            res.sendStatus(500);
        }
        MemberService.deleteMember(req.params.id, 
            function(err, rows) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(rows)
                }
            }
        );
    }
}

module.exports = MemberController;