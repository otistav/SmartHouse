'use strict';
module.exports = function(sequelize, DataTypes) {
  var device = sequelize.define('device', {
    name: DataTypes.STRING,
    typeUUID: DataTypes.UUID,
    propFunction: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return device;
};