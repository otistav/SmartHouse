var express = require('express');
var router = express.Router();
var db = require('../models');
var hashThePassword = require('../Utils/PasswordHash');
var crypto = require('crypto');
var salt = require('../config/tsconfig.json');



/* GET users listing. */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

    db.user.findOne({where: {login:username}}).then(user => {
         if(user && (user.password === hashThePassword.cryptoThePassword(password))) {
             req.session.user = user;
             res.status(200).send('Congratulation, you are logged in!')
         }
         else {
             res.status(401).send("Sorry, incorrect password")
         }

     });
});

router.get('/', function(req, res, next) {
    res.send(req.session.user)

});
module.exports = router;