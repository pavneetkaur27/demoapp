const mongoose = require('mongoose');
const models = require('../models');


var createUser = function (payload, callback) {
    let user = new models.users();
    user.firstname = payload.fname;
    user.lastname = payload.lname;
    user.email = payload.email;
    user.phone = payload.phone;
    user.company = payload.company;
    user.save(payload, function (error, user) {
        if(error)
            callback(error);
        else{
            callback(null,user);
        }
    })
}

module.exports = {
    'createUser': createUser
}