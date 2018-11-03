var  mongoose =  require('mongoose');


var loginModel = mongoose.Schema({
    firstname                           :String,
    lastname                            :String,
    email                               :String,
    phone                               :String,
    company                             :String
    }
);

module.exports= mongoose.model('logins',loginModel);
