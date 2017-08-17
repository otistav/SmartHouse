var express = require('express');
var router = express.Router();
var authRequaire = require('../Utils/middleWares/authRequaire');
var adminRequaire = require('../Utils/middleWares/adminRequaire');
var db = require('../models');
var MandatoryFieldError = require('../Utils/Errors/ConflictErrors/MandatoryFieldError');
var ExistingError = require('../Utils/Errors/NotFoundErrors/ExistingError');
var AccessError = require('../Utils/Errors/AccessError');


router.get('/', authRequaire, function (req, res, next) {

  db.control.findAll({include: [{model:db.pageControl,where:{pageID:req.query.page_id}, as: 'pageControl'}]}).then(controls => {
    res.status(200).send(controls)
  }).catch(err => {
    console.log(err)
  })
});


module.exports = router;