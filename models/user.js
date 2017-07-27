'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('user', {
    login: {
        type:DataTypes.STRING,
        unique: true
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return User;
};