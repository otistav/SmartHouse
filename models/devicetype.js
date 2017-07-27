'use strict';
module.exports = function(sequelize, DataTypes) {
  var deviceType = sequelize.define('deviceType', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return deviceType;
};