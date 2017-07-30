var express = require('express');
var router = express.Router();
var authRequaire = require('../Utils/middleWares/authRequaire');
var adminRequaire = require('../Utils/middleWares/adminRequaire');
var db = require('../models');
var ServerError = require('../Utils/Errors/ServerError');
var MandatoryFieldError = require('../Utils/Errors/ConflictErrors/MandatoryFieldError');
var ExistingError = require('../Utils/Errors/NotFoundErrors/ExistingError');
var AccessError = require('../Utils/Errors/AccessError');


router.get('/', authRequaire, function (req, res, next) {

  db.controlType.findAll().then(controlTypes => {
    res.status(200).send(controlTypes)
  }).catch(err => {
    next(err);
  })
});

router.get('/:id', authRequaire, function (req, res, next) {
  let id = req.params.id;

  db.controlType.findById(id).then(controlType => {
    if (!controlType) throw new ExistingError(id, 'controlType ');
    res.status(200).send(controlType);
  }).catch(err => {
    next(err);
  })
});

router.post('/', adminRequaire, function (req, res, next) {

  db.controlType.create({
    name: req.body.name
  }).then(()=> {
    res.status(200).send("ok")
  }).catch((err)=> {
    next(err);
  });
});

router.delete('/:id', adminRequaire, function (req, res, next) {
  let id = req.params.id;

  db.controlType.findById(id).then(controlType => {
    console.log(controlType);
    if (!controlType) throw ExistingError(id, 'controlType');
    controlType.destroy().then(() => {
      res.status(200).send('controlType deleted!')
    });
  }).catch(err => {
    next(err);
  });
});

router.patch('/:id', adminRequaire, function (req, res, next) {
  let id = req.params.id;
  db.controlType.findById(id).then(controlType => {

    if (!controlType) throw new ExistingError(id, 'controlType');
    if(req.body.name) controlType.name = req.body.name;
    return controlType.save();

  }).then(() => {
    res.status(200).send('controlType edited')
  }).catch(err => {
    next(err);
  })
});

module.exports = router;