'use strict'
module.exports = function (app) {
    var member = require('../controllers/memberController');

    // member Routes
    app.route('/member')
        .get(member.get_members);

    app.route('/member/email/:email')
        .get(member.member_by_email);

    app.route('/member/:memberId')
        .get(member.member_by_id);

};