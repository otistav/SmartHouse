var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next){
    req.session.destroy().then(() => {
        res.status(200).send('you are logged out!')
    }).catch(err => {
        next(err);
    });

});

module.exports = router;