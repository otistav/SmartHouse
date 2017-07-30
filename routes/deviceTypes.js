var express = require('express');
var router = express.Router();
var authRequaire = require('../Utils/middleWares/authRequaire');
var adminRequaire = require('../Utils/middleWares/adminRequaire');
var db = require('../models');
var MandatoryFieldError = require('../Utils/Errors/ConflictErrors/MandatoryFieldError');
var ExistingError = require('../Utils/Errors/NotFoundErrors/ExistingError');
var AccessError = require('../Utils/Errors/AccessError');


router.get('/', authRequaire, function (req, res, next) {

  db.deviceType.findAll().then(deviceTypes => {
    res.status(200).send(deviceTypes)
  }).catch(err => {
    next(err);
  })

});

router.get('/:id', authRequaire, function (req, res, next) {
  let id = req.params.id;

  db.deviceType.findById(id).then(deviceType => {
    if (!deviceType) throw new ExistingError(id, 'deviceType ');
    res.status(200).send(deviceType);
  }).catch(err => {
    next(err);
  })

});

router.post('/',adminRequaire,function (req, res, next) {

  db.deviceType.create({
    name: req.body.name
  }).then(()=> {
    res.status(200).send("ok")
  }).catch((err)=> {
    next(err);
  });

});

router.delete('/:id',adminRequaire,function (req, res, next) {
  let id = req.params.id;

  db.deviceType.findById(id).then(deviceType => {
    if (!deviceType) throw new ExistingError(id, 'deviceType ');
    deviceType.destroy().then(() => {
      res.status(200).send('deviceType deleted!')
    });

  }).catch(err => {
    next(err);
  });
});

router.patch('/:id',adminRequaire, function (req, res, next) {
  let id = req.params.id;
  db.deviceType.findById(id).then(deviceType => {

    if (!deviceType) throw new ExistingError(id, 'deviceType ');
    if(req.body.name) deviceType.name = req.body.name;
    return deviceType.save();

  }).then(() => {
    res.status(200).send('deviceType edited')
  }).catch(err => {
    next(err);
  })
});

module.exports = router;