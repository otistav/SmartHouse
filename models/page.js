'use strict';
module.exports = function(sequelize, DataTypes) {
  var page = sequelize.define('page', {
    name: {
        type:DataTypes.STRING,
        unique: true
    },

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return page;
};