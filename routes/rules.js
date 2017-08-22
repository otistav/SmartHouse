var express = require('express');
var router = express.Router();
var authRequaire = require('../Utils/middleWares/authRequaire');
var adminRequaire = require('../Utils/middleWares/adminRequaire');
var db = require('../models');
var MandatoryFieldError = require('../Utils/Errors/ConflictErrors/MandatoryFieldError');
var ExistingError = require('../Utils/Errors/NotFoundErrors/ExistingError');
var AccessError = require('../Utils/Errors/AccessError');
var deviceValidator = require('../Validators/device');


router.get('/', authRequaire, function (req, res, next) {
  console.log(req.query.controlID, req.query.type);
  console.log(typeof req.query.controlID, typeof req.query.type);
  db.rule.findAll({where: { sourceID: req.query.controlID, sourceType: req.query.type } }).then(rules => {

    res.status(200).send(rules)
  }).catch(err => {
    next(err);
  })

});

router.patch('/:id',adminRequaire, function (req, res, next) {
  let id = req.params.id;
  db.rule.findById(id).then(page => {

    if (!page) throw new ExistingError(id, 'page ');
    if (req.body.sourceID) page.sourceID = req.body.sourceID;
    if (req.body.sourceType) page.sourceType = req.body.sourceType;
    if (req.body.event) page.event = req.body.event;
    if (req.body.func) page.func = req.body.func;



    return page.save();
  }).then(() => {
    res.status(200).send('page edited')
  }).catch(err => {
    next(err);
  })
});

router.get('/:id', authRequaire, function (req, res, next) {
  let id = req.params.id;

  db.rule.findById(id).then(page => {
    if (!page) throw new ExistingError(id, 'rule ');
    res.status(200).send(page);
  }).catch(err => {
    next(err);
  })

});


router.post('/',adminRequaire,function (req, res, next) {
  db.rule.create({
    sourceID: req.body.sourceID,
    sourceType: req.body.sourceType,
    event: req.body.event,
    func: req.body.func
  }).then(()=> {
    res.status(200).send("ok")
  }).catch((err)=> {
    next(err);
  });

});

module.exports = router;