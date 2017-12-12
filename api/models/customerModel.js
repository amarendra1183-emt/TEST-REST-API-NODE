'use strict'
// var elasticsearch = require('../../elasticsearch_client');
var index = 'emt';
var type = 'customer';

var customer_by_domain = function (domain) {
    return es_client.search({
        index: index,
        type: type,
        _sourceExclude: true,
        body: {
            size: 1,
            query: {
                bool: {
                    must: [{
                        term: {
                            "domains.raw": domain
                        }
                    }]
                }
            }
        }
    });
};

module.exports = {
    customer_by_domain: customer_by_domain,
    customer_by_id: function (customerId) {
        return es_client.get({
            index: index,
            type: type,
            id: customerId
        }).then(function (resp) {
            return resp;
        }, function (err) {
            return null;
        });
    },
    customerId : function () {
        return customer_by_domain('localhost')
        .then(function(res) {
            return res.hits.hits[0]._id;
        })
    }
}