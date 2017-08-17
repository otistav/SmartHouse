'use strict';
module.exports = function(sequelize, DataTypes) {
  var device = sequelize.define('device', {
    name: DataTypes.STRING,
    typeUUID: DataTypes.UUID,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return device;
};