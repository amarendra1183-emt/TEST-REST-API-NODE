'use strict'
var member = require('../models/memberModel')
module.exports = {
    member_by_id: function (req, resp) {
        member.getMemberById(req.params.memberId)
        .then(function (respone) {
            resp.json(respone);
        }, function (error) {
            resp.send(error);
        });
    },
    member_by_email: function(req, res) {
        member.get_member_by_email(req.params.email)
        .then(function(response) {
            console.log('processed ' + JSON.stringify(response));
            res.json(response);
        }, function(err) {
            res.send(err);
        })
    },
    get_members: function (req, res) {
        member.getMembers().then(function (respone) {
            res.json(respone);
        }, function (error) {
            res.send(Error);
        });
    },
    get_members_by_company(req, res) {
        member.getMembersByCompany(req.params.companyId)
        .then(function (response) {
            res.json(response);
        }, function (err) {
            res.send(err);
        })
    }

}
