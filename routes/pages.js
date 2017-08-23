var express = require('express');
var router = express.Router();
var authRequaire = require('../Utils/middleWares/authRequaire');
var adminRequaire = require('../Utils/middleWares/adminRequaire');
var db = require('../models');
var MandatoryFieldError = require('../Utils/Errors/ConflictErrors/MandatoryFieldError');
var ExistingError = require('../Utils/Errors/NotFoundErrors/ExistingError');
var AccessError = require('../Utils/Errors/AccessError');
var BadRequestError = require('../Utils/Errors/BadRequestError');
var ValidationError = require('../Utils/Errors/ValidationError');



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
    name: req.body.name,
    caption: req.body.caption,
    width: req.body.width,
    height: req.body.height,
    position_x: req.body.position_x,
    position_y: req.body.position_y,
    iconID: req.body.iconID,
  }).then(()=> {
    res.status(200).send("ok")
  }).catch((err)=> {
    if (err.name === 'SequelizeForeignKeyConstraintError')
      err = new BadRequestError();
    if (err.name === 'SequelizeUniqueConstraintError')
      err = new ValidationError();
    next(err);
  });

});

router.delete('/:id',adminRequaire,function (req, res, next) {
  let id = req.params.id;

  db.pageControl.destroy({where: {pageID: id}}).then(() => {
    db.page.findById(id).then(page => {
      page.destroy().then(() => {
        res.status(200).send('ok')
      })
    });
  })
});

router.patch('/:id',adminRequaire, function (req, res, next) {
    let id = req.params.id;
    db.page.findById(id).then(page => {

      if (!page) throw new ExistingError(id, 'page ');
      if (req.body.name) page.name = req.body.name;
      if (req.body.width) page.width = req.body.width;
      if (req.body.height) page.height = req.body.height;
      if (req.body.position_x) page.position_x = req.body.position_x;
      if (req.body.position_y) page.position_y = req.body.position_y;
      if (req.body.iconID) page.iconID = req.body.iconID;
      if (req.body.caption) page.caption = req.body.caption;
      return page.save();
    }).then(() => {
          res.status(200).send('page edited')
    }).catch(err => {
        next(err);
    })
});

module.exports = router;