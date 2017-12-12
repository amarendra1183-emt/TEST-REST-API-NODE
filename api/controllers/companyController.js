'use strict'
var company = require('../models/companyMoadel')
module.exports = {
    company_by_id: function (req, resp) {
        company.get_company_by_id(req.params.companyId).then(function (respone) {
            resp.json(respone);
        }, function (error) {
            resp.send(error);
        });
    },
    list_companies: function (req, res) {
        company.list_all_company_by_customer().then(function (respone) {
            res.json(respone);
        }, function (error) {
            res.send(Error);
        });
    }

}
