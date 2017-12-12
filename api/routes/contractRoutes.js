'use strict'
module.exports = function (app) {
    var contract_controller = require('../controllers/contractController');
    var asset_type_controller = require('../controllers/assetTypeController');
    var assets_controller = require('../controllers/assetController');
    // member Routes
    app.route('/contract')
        .get(contract_controller.list_contracts);

    app.route('/contract/:contractId')
        .get(contract_controller.getContractById);
    // Asset types routes
    app.route('/contract/:contractId/asset_types')
        .get(asset_type_controller.asset_types_by_contract_id);
    
    app.route('/contract/:contractId/asset_type/:asset_type_id')
        .get(asset_type_controller.asset_type_by_id);

    app.route('/contract/:contractId/asset_types/main')
        .get(asset_type_controller.main_asset_types_by_contract);

    app.route('/contract/:contractId/asset_types/sub_asset_types')
        .get(asset_type_controller.sub_asset_types_by_contract);

    // Asset routes
    app.route('/contract/:contractId/assets')
    .get(assets_controller.get_assets_by_asset_type);
};