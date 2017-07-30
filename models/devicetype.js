'use strict';
module.exports = function(sequelize, DataTypes) {
  var deviceType = sequelize.define('deviceType', {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return deviceType;
};