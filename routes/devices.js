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

    db.device.findAll().then(devices => {
        res.status(200).send(devices)
    }).catch(err => {
        next(err);
    })

});

router.get('/:id', authRequaire, function (req, res, next) {
    let id = Number(req.params.id);

    db.device.findById(id).then(device => {
        if (!device) throw new ExistingError(id, 'device ');
        res.status(200).send(device);
    }).catch(err => {
        next(err);
    })

});

router.post('/',adminRequaire,function (req, res, next) {
    deviceValidator.asCreate(req.body);
    db.device.create({
      name: req.body.name,
      typeUUID: req.body.typeUUID,
    }).then(()=> {
        res.status(200).send("ok")
    }).catch((err)=> {
        next(err);
    });

});

router.delete('/:id',adminRequaire,function (req, res, next) {
    let id = Number(req.params.id);

    db.device.findById(id).then(device => {
        if (!device) throw new ExistingError(id, 'device ');
        device.destroy().then(() => {
            res.status(200).send('device deleted!')
        });

    }).catch(err => {
        next(err);
    });
});

router.patch('/:id',adminRequaire, function (req, res, next) {
    let id = req.params.id;
    // deviceValidator.asUpdate(req.body);
    db.device.findById(id).then(device => {

        if (!device) throw new ExistingError(id, 'device ');
        if(req.body.name) device.name = req.body.name;
        if (req.body.typeUUID) device.typeUUID = req.body.typeUUID;
        if (req.body.propFunction) device.propFunction = req.body.propFunction;
        return device.save();

    }).then(() => {
        res.status(200).send('device edited')
    }).catch(err => {
        next(err);
    })
});

module.exports = router;