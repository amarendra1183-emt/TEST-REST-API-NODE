'use strict'
var asset = require('../models/assetModel');

module.exports = {
    //get assets by asset_type and contract id
    get_assets_by_asset_type: function (req, res) {
        asset.get_assets_by_class_name(req.params.contractId, req.query.className, 
            req.query.discipline, req.query.sub_system, req.query.function, req.query.sub_functional_group,
        req.query.level1, req.query.level2, req.query.level3, req.query.level4, 
        req.query.secondSearch, req.query.thirdSearch, req.query.filterOption )
        .then(function(response) {
            res.json(response);
        }, function(err) {
            res.send(err);
        })
    },
    // get asset by tag_code
    get_asset_by_tag_code: function (req, res) {

    },
    // get asset by asset type and changeset. 
    get_assets_by_changeset: function (req, res) {

    },
    // get discipline, functions and asset_types, asset_type aggregations.
    get_asset_class_aggregations: function(req, res) {

    }
}