var express = require('express');
var router = express.Router();
var session = require('express-session');
var bodyParser = require('body-parser');
var models = require('../models');
var path = require('path');
var mongoose = require('mongoose');
var fs = require('fs');
var request = require('request');
const controllers = require('../controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sign Up',error:'' });
});

router.post('/',function (req,res) {
    var firstname=req.body.fname;
    var lastname=req.body.lname;
    var email=req.body.email;
    var phone = req.body.phone;
    var company = req.body.company;
    req.session.user =firstname+" "+lastname ;
    if (firstname == "" && lastname == "" && email == "") {
        res.render('index', {title: 'Sign Up', error: 'No field can be empty!'});
    }else{
        if (!isNaN(phone) && phone.length==10){
            controllers.usercontroller.createUser(req.body, (error, response) => {
                if(error)
                    res.render('index', {title: 'Sign Up', error: error});
                else{
                    models.users.find({},function (err,userlist) {
                        if(err){
                            return res.send(err);
                        }else{
                            res.render('user/userdetail',{users:userlist});
                        }
                    })
                }
            })
        }else{
            res.render('index', {title: 'Sign Up', error: 'Please provide valid contact no.'});
        }
    }
});

router.get('/userinfo/:id',function (req,res) {
    var userid=req.params.id;
    req.session.userid=userid;
    models.users.findOne({_id:userid}, function (err, user) {
        if (err)
            return res.send(err);
        else {
           // console.log("-------------------------------------"+user);
            res.render('user/moreinfo',{user:user})
        }
    })
});

module.exports = router;
