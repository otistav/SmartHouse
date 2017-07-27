var express = require('express');
var router = express.Router();
var db = require('../models');


/* GET users listing. */
router.post('/', function(req, res, next) {
    var username = req.body.username;
    var password = req.body.password;

     db.user.findOne({where: {login:username}}).then(user => {

         if(user && (user.password === password)){
             req.session.user = user;
             res.status(200).send('Congratulation, you are logged in!')
         }
         else {
             res.status(401).send("Sorry, incorrect password")
         }

     });

    // findUser(username).then(function (user) {
    //     console.log("im here", user);
    //     if (!user) {
    //         console.log("you are not user");
    //         throw new Error('User not found');
    //     }
    //     if (user.password !== password) {
    //         throw  new Error('Password or login incorrect');
    //     }
    //     req.session.user = user;
    //     console.log(req.session.user);
    //     res.send('you are logged in! Congratulations!');
    // }).catch(()=> {
    //    res.status(401).send('sorry, incorrect login or password');
    // });




    function findUser(login) {
        return Promise.resolve().then(() => {
            switch (login) {
                case 'user': return {username: 'user', password: '123', isAdmin: false};
                case 'admin': return {username: 'admin', password: '1234',isAdmin: true}
                default: return
            }
        })
    }
});

router.get('/', function(req, res, next) {
    res.send(req.session.user)

});
module.exports = router;
