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

    db.control.findAll().then(controls => {
        res.status(200).send(controls)
    }).catch(err => {
        next(err);
    })
});

router.get('/:id', authRequaire, function (req, res, next) {
    let id = req.params.id;

    db.control.findById(id).then(control => {
        if (!control) throw new ExistingError(id, 'control ');
        res.status(200).send(control);
    }).catch(err => {
        next(err);
    })
});

router.post('/', adminRequaire, function (req, res, next) {

    db.control.create({
      name: req.body.name,
      x_size: req.body.x_size,
      y_size: req.body.y_size,
      x: req.body.x,
      y: req.body.y
    }).then(()=> {
      res.status(200).send("ok")
    }).catch((err)=> {
      next(err);
    });
});

router.delete('/:id', adminRequaire, function (req, res, next) {
    let id = Number(req.params.id);

    db.control.findById(id).then(control => {
        if (!control) throw ExistingError(id, 'control');
            control.destroy().then(() => {
                res.status(200).send('control deleted!')
            });
    }).catch(err => {
        next(err);
    });
});

router.patch('/:id', adminRequaire, function (req, res, next) {
    let id = req.params.id;
    db.control.findById(id).then(control => {

      if (!control) throw new ExistingError(id, 'control');
      if(req.body.name) control.name = req.body.name;
      if(req.body.x_size) control.x_size = req.body.x_size;
      if(req.body.y_size) control.y_size = req.body.y_size;
      if(req.body.x) control.x = req.body.x;
      if(req.body.y) control.y = req.body.y;
      return control.save();

    }).then(() => {
        res.status(200).send('control edited')
    }).catch(err => {
        next(err);
    })
});

module.exports = router;