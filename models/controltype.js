'use strict';
module.exports = function(sequelize, DataTypes) {
  var controlType = sequelize.define('controlType', {
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return controlType;
};