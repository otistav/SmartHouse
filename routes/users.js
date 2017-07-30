var express = require('express');
var router = express.Router();
var authRequaire = require('../Utils/middleWares/authRequaire');
var adminRequaire = require('../Utils/middleWares/adminRequaire');
var db = require('../models');
var MandatoryFieldError = require('../Utils/Errors/ConflictErrors/MandatoryFieldError');
var ExistingError = require('../Utils/Errors/NotFoundErrors/ExistingError');
var AccessError = require('../Utils/Errors/AccessError');
var userValidator = require('../Validators/user');
var hashThePassword = require('../Utils/PasswordHash');


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
        if (!user) throw new ExistingError(id, 'user ');
        res.send(user);

    }).catch(err => {
        next(err);
    })
});


router.get('/',adminRequaire,function (req, res, next) {
    db.user.findAll().then((users) => {
        res.status(200).send(users);
    }).catch(err => {
        next(err);
    });
});

router.patch('/:id',adminRequaire, function (req, res, next) {
    let id = req.params.id;
    userValidator.asUpdate(req.body);

    Promise.resolve().then(()=>{
        if(req.session.id === id && req.body.isAdmin) throw new Error('you cant delete yourself');
        return db.user.findById(id);
    }).then(user => {
        if (!user) throw new ExistingError(req.params.id, 'user ');
        if (req.body.lastName) user.lastName = req.body.lastName;
        if (req.body.firstName) user.firstName = req.body.firstName;
        if (req.body.isAdmin) user.isAdmin = req.body.isAdmin;
        if (req.body.password) user.password = hashThePassword.cryptoThePassword(req.body.password);
        return user.save();
    }).then(()=> {
        res.send('user edited!');
    }).catch(err => {
        next(err);
    })

});

router.post('/',adminRequaire,function (req, res, next) {
    // userValidator.asCreate(req.body);
    let hashPass = hashThePassword.cryptoThePassword(req.body.password);
    db.user.create({
        login: req.body.login,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashPass,
        isAdmin: req.body.isAdmin,
    }).then(()=> {
        res.status(200).send("user created successfully!")
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
            if(!user)  throw new ExistingError(req.params.id, 'user') ;
            user.destroy().then(() => {
                res.status(200).send('You are deleted a user successfully!')
            });

        }).catch((err) => {
            console.log(err);
            next(err)
        })
    }

});

module.exports = router;

/*'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('pageControls', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      controlID: {
        type: Sequelize.INTEGER,
        references: {
            model: 'controls',
            key: 'id'
        }
      },
      pageID: {
        type: Sequelize.INTEGER,
        references: {
            model:'pages',
            key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('pageControls');
  }
};*/
