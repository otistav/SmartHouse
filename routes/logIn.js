var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../Utils/PasswordHash');
var crypto = require('crypto');
var salt = require('../config/tsconfig.json');
var userValidator = require('../Validators/user');



/* GET users listing. */
var AutorisationError = require('../Utils/Errors/AutorisationError');
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    userValidator.asLogin({username: username, password: password});
    db.user.findOne({where: {login:username}}).then(user => {
         if(user && (user.password === hashThePassword.cryptoThePassword(password))) {
             req.session.user = user;
             res.status(200).send(req.session.user)
         }
         else {
           const error = new AutorisationError();
           next(error)
         }
     });

});
module.exports = router;
