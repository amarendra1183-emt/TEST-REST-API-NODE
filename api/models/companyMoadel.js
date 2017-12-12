'use strict'
var customer = require('./customerModel');
var index = 'emt';
var type = 'company';

var get_company_by_id = function(companyId) {
    return es_client.get({
        index: index,
        type: type,
        id:companyId
    });
};

var list_all_companies = function(customerId) {
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: 5000,
            query: {
                bool: {
                    must:[
                        {
                            term: {
                                'customer.raw': customerId
                            }
                        }
                    ]

                    
                }
            }
        }

    })
}

module.exports = {
    get_company_by_id : function(companyId) {
        return get_company_by_id(companyId);
    }, 
    list_all_company_by_customer : function () {
        return customer.customerId()
        .then(list_all_companies) 
    }
}