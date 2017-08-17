'use strict';
module.exports = function(sequelize, DataTypes) {
  var icon = sequelize.define('icon', {
    path: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return icon;
};