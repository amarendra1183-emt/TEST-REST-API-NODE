'use strict'
var asset_type = require('../models/AssetTypeModel');

module.exports = {
    asset_type_by_id: function (req, res) {
        asset_type.asset_type_by_id(req.params.asset_type_id)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.send(err);
            })
    },
    asset_types_by_contract_id: function (req, res) {
        asset_type.asset_types_by_contractId(req.params.contractId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.send(err);
            })
    },
    main_asset_types_by_contract: function (req, res) {
        asset_type.main_asset_types_by_contract(req.params.contractId)
            .then(function (response) {
                res.json(response);
            }, function (err) {
                res.send(err);
            })
    },
    sub_asset_types_by_contract: function(req, res) {
        asset_type.sub_assets_types_by_contract(req.params.contractId)
            .then(function(response) {
                res.json(response);
            }, function(err) {
                res.send(err);
            })
    }
}