'use strict'
var customer = require('./customerModel');
var index = 'assets',
    type = 'asset_type',
    size = 50000;

var getAsset_type_by_id = function (asset_type_id) {
    return es_client.get(
        {
            index: index,
            type: type,
            id: asset_type_id
        }
    );
}
// Get all asset_types by contractId.
var asset_types_by_contractId = function (customerId, contractId) {
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: size,
            query: {
                bool: {
                    must: [
                        { term: { 'contractId.raw': contractId } },
                        { term: { 'customer.raw': customerId } }
                    ]
                }
            }
        }
    });
}
// Get all main asset_types by contractId. 
var get_main_asset_types_by_contract = function (customerId, contractId) {
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: size,
            query: {
                bool: {
                    must: [
                        { term: { 'contractId.raw': contractId } },
                        { term: { 'customer.raw': customerId } }
                    ]
                }
            },
            filter: {
                and: {
                    filters: [
                        {
                            missing: {
                                field: 'parent_id',
                                existence: true,
                                null_value: true
                            }
                        }
                    ]
                }
            }
        }
    });
}
// Get all parts/subparts by contractId.
var get_all_parts_sub_parts_type_by_contract_id = function (customerId, contractId) {
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: size,
            query: {
                bool: {
                    must: [
                        { term: { 'contractId.raw': contractId } },
                        { term: { 'customer.raw': customerId } }
                    ]
                }
            },
            filter: {
                not: {
                    filter: {
                        missing: {
                            field: 'parent_id',
                            existence: true,
                            null_value: true
                        }
                    }
                }
            }
        }
    });
}
// Get all parts/subparts by asset_type_id
var get_all_parts_subparts_by_asset_type_id = function (customerId, contractId, asset_type_id) {
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: size,
            query: {
                bool: {
                    must: [
                        { term: { 'contractId.raw': contractId } },
                        { term: { 'customer.raw': customerId } },
                        { term: { 'asset_type_id.raw': asset_type_id } }
                    ]
                }
            }
        }
    });
}
// Get all sub Asset types by parentId
var get_all_child_asset_types_by_parent_id = function (customerId, contractId, parentId) {
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: size,
            query: {
                bool: {
                    must: [
                        { term: { 'contractId.raw': contractId } },
                        { term: { 'customer.raw': customerId } },
                        { term: { 'parent_id.raw': parentId } }
                    ]
                }
            }
        }
    });
}

module.exports = {
    asset_type_by_id: function (asset_type_id) {
        return getAsset_type_by_id(asset_type_id);
    },
    asset_types_by_contractId: function (contractId) {
        // console.log('contract id is ' + contractId);
        return customer.customerId()
            .then(function (customerId) {
                return asset_types_by_contractId(customerId, contractId);
            });
    },
    main_asset_types_by_contract: function (contractId) {
        return customer.customerId()
            .then(function (customerId) {
                return get_main_asset_types_by_contract(customerId, contractId);
            });
    },
    sub_assets_types_by_contract: function (contractId) {
        return customer.customerId()
            .then(function (customerId) {
                return get_all_parts_sub_parts_type_by_contract_id(customerId, contractId);
            });
    },
    asset_types_by_asset_type_id: function (contractId, asset_type_id) {
        return customer.customerId()
            .then(function (customerId) {
                return get_all_parts_subparts_by_asset_type_id(customerId, contractId, asset_type_id);
            })
    },
    asset_types_by_parent_id: function (contractId, parent_id) {
        return customer.customerId()
            .then(function (customerId) {
                return get_all_child_asset_types_by_parent_id(customerId, contractId, parent_id);
            })
    }
}
