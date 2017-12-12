'use strict'
module.exports = function (app) {
    var company = require('../controllers/companyController');
    var member = require('../controllers/memberController');
    // member Routes
    app.route('/company')
        .get(company.list_companies);

    app.route('/company/:companyId')
        .get(company.company_by_id);

    app.route('/company/:companyId/members')
        .get(member.get_members_by_company);
};