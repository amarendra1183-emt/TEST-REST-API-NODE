'use strict'
var contract = require('../models/contractModel');

module.exports = {
    list_contracts: function (req, res) {
        contract.list_contracts()
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.send(err);
            })
    },
    getContractById: function(req, res) {
        contract.getContractById(req.params.contractId)
        .then(function(response) {
            res.json(response);
        }, function(err) {
            res.send(err);
        })
    }

};