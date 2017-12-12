'use strict'
var customer = require('./customerModel');
var index = 'supplychain',
    type = 'contract',
    size = 50000;

var getContractById = function (contractId) {
    return es_client.get({
        index: index,
        type: type,
        id: contractId
    });
}

var getContracts = function () {
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: size,
            query: {
                match_all: {}
            }
        }
    })
}

module.exports = {
    getContractById: function(contractId) {
        return getContractById(contractId);
    },
    list_contracts: function() {
        return getContracts();
    }
}