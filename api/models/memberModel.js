'use strict'
var customer = require('./customerModel');
var index = 'emt';
var type = 'member';

var loadMemberByCustomer = function (customerId) {
    console.log('customerId is ' + customerId);
    if(!customerId) {
        return null;
    }
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: 40,
            query: {
                bool: {
                    must: [{
                        term: {
                            'customer.raw': customerId
                        }
                    }]
                }
            }
        }
    });
}

var getMemberByEmail = function(email, customerId) {
    email = email.toLowerCase();
    return es_client.search({
        index: index,
        type: type,
        body: {
            query: {
                "match_phrase" : {
                    "user_email.raw" : email
                }
            }, 
            filter: {
                and: [{
                    term: {
                        'customer.raw': customerId
                    }
                }]
            }
        }
    })
}

var searchMembersByCompany = function(customerId, companyId) {
    return es_client.search({
        index: index,
        type: type,
        body: {
            size: 40,
            query: {
                bool: {
                    must: [{
                        term: {
                            'user_group_id': companyId
                        }
                    },
                    {
                        term: {
                            'customer.raw': customerId
                        }
                    }]
                }
            }
        }
    });
}

module.exports = {
    // Get member by Id

    getMemberById: function (userId) {
        return es_client.get({
            index: index,
            type: type,
            id: userId
        });
    },

    get_member_by_email: function(email) {
        return customer.customerId()
        .then(function(res){
           return getMemberByEmail(email, res)
        });
    },

    getMembers: function () {
        return customer.customerId()
        .then(loadMemberByCustomer);
    },

    getMembersByCompany(companyId) {
        return customer.customerId()
        .then(function(res) {
            return searchMembersByCompany(res, companyId);
        });
    }
};