var express = require('express');
var router = express.Router();
var adminRequire = require('../Utils/middleWares/adminRequaire');

/* GET users listing. */
router.get('/',adminRequire, function(req, res, next) {
    res.send('Welcome to user page!');
});

module.exports = router;
