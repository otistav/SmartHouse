var express = require('express');
var router = express.Router();
var authRequaire = require('../Utils/middleWares/authRequaire');
var adminRequaire = require('../Utils/middleWares/adminRequaire');
var ExistingError = require('../Utils/Errors/NotFoundErrors/ExistingError');
var BadRequestError = require('../Utils/Errors/BadRequestError');
var db = require('../models');


router.get('/', authRequaire, function (req, res, next) {

    db.pageControl.findAll().then(pageControls => {
        res.status(200).send(pageControls)
    }).catch(err => {
        next(err);
    })

});

router.post('/',adminRequaire,function (req, res, next) {

    db.pageControl.create({
        controlID: req.body.controlID,
        pageID: req.body.pageID
    }).then(() => {
        res.status(200).send('connection between page and control created successfully!')
    }).catch(err => {
        if (err.name === 'SequelizeForeignKeyConstraintError')
          err = new BadRequestError();

        next(err)
    })
});

router.patch('/:id',adminRequaire, function (req, res, next) {
    let id = req.params.id;
    db.pageControl.findById(id).then(pageControl => {
        if (!pageControl) throw new ExistingError(id, 'page control ');
        if (req.body.pageID) pageControl.pageID = req.body.pageID;
        if (req.body.controlID) pageControl.controlID = req.body.controlID;
        return pageControl.save();
    }).then(() => {
        res.send('pageControl edited!')
    }).catch(err => {
        next(err);
    })
});

router.delete('/:id',adminRequaire,function (req, res, next) {
    let id = Number(req.params.id);

    db.pageControl.findById(id).then(pageControl => {
        if (!pageControl) throw ExistingError(req.params.id, 'page control');
        pageControl.destroy().then(() => {
            res.status(200).send('pageControl deleted!')
        })
    }).catch(err => {
        next(err)
    })
});

module.exports = router;