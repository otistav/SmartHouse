var express = require('express');
var router = express.Router();
var authRequaire = require('../middleWares/authRequaire');
var adminRequaire = require('../middleWares/adminRequaire');
var db = require('../models');
var MandatoryFieldError = require('../Errors/ConflictErrors/MandatoryFieldError');
var ExistingError = require('../Errors/NotFoundErrors/ExistingError');
var AccessError = require('../Errors/AccessError');

/* GET users listing. */
router.get('/:id', authRequaire, function(req, res, next) {
    let id = Number(req.params.id);
    const sessionUser = req.session.user;

    Promise.resolve().then(() => {
        if (sessionUser.isAdmin) return;
        if (sessionUser.id === id) return;
        throw  new AccessError();
    }).then(() => {
        return db.user.findById(id);
    }).then(user => {
        if (!user) throw new ExistingError(id);
        res.send(user);

    }).catch(err => {
        next(err);
    })
});


router.get('/',adminRequaire,function (req, res, next) {
    db.user.findAll().then((users)=>{
            res.status(200).send(users);
        });
});

router.patch('/:id',adminRequaire, function (req, res, next) {
    let id = req.params.id;

    Promise.resolve().then(()=>{
        if(req.session.id === id && req.body.isAdmin) throw new Error();
        return db.user.findById(id);
    }).then(user => {
        if(!user) throw new Error('user doesnt exist');
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.isAdmin) user.isAdmin = req.body.isAdmin;
        return user.save();
    }).then(()=>{
        res.send('ok');
    }).catch(err =>{
        next(err)
    })

});

router.post('/',adminRequaire,function (req, res, next) {
    db.user.create({
        login: req.body.login,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    }).then(()=> {
        res.status(200).send("ok")
    }).catch((err)=> {
        next(err);
    });
});

router.delete('/:id',adminRequaire,function (req, res, next) {
    let id = Number(req.params.id);

    if (req.session.user.id === id) {
        next();
    }
    else {
        console.log(req.params.id);
        db.user.findById(id).then(user => {
            if(user) {
                user.destroy();
                res.status(200).send('You are deleted a user successfully!')
            }
            else {
               throw new ExistingError(req.params.id) ;
            }

        }).catch((err) => {
            console.log(err);
            next(err)
        })
    }

});

module.exports = router;
