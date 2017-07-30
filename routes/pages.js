var express = require('express');
var router = express.Router();
var authRequaire = require('../Utils/middleWares/authRequaire');
var adminRequaire = require('../Utils/middleWares/adminRequaire');
var db = require('../models');
var MandatoryFieldError = require('../Utils/Errors/ConflictErrors/MandatoryFieldError');
var ExistingError = require('../Utils/Errors/NotFoundErrors/ExistingError');
var AccessError = require('../Utils/Errors/AccessError');


router.get('/', authRequaire, function (req, res, next) {
  db.page.findAll().then(pages => {
    res.status(200).send(pages)
  }).catch(err => {
    next(err);
  })

});

router.get('/:id', authRequaire, function (req, res, next) {
  let id = req.params.id;

  db.page.findById(id).then(page => {
    if (!page) throw new ExistingError(id, 'page ');
    res.status(200).send(page);
  }).catch(err => {
    next(err);
  })

});

router.post('/',adminRequaire,function (req, res, next) {
  db.page.create({
    name: req.body.name
  }).then(()=> {
    res.status(200).send("ok")
  }).catch((err)=> {
    next(err);
  });

});

router.delete('/:id',adminRequaire,function (req, res, next) {
  let id = req.params.id;
  const force = req.query.force;
  if (!req.query.force) throw new Error('alarm!');

  db.pageControl.destroy({where: {pageID: id}}).then(() => {

    res.send('ok')
  })

  // db.pageControl.findAll({
  //   where: {pageID: id}
  // }).then(pageControls => {
  //
  // }).catch(err => {
  //   next(err);
  // });
});

router.patch('/:id',adminRequaire, function (req, res, next) {
    let id = req.params.id;
    db.page.findById(id).then(page => {

        if (!page) throw new ExistingError(id, 'page ');
        if (req.body.name) page.name = req.body.name;
        return page.save();
        }).then(() => {
        res.status(200).send('page edited')
    }).catch(err => {
        next(err);
    })
});

module.exports = router;