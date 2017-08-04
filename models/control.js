'use strict';
module.exports = function(sequelize, DataTypes) {
  var control = sequelize.define('control', {
    name: DataTypes.STRING,
    x_size: DataTypes.INTEGER,
    y_size: DataTypes.INTEGER,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return control;
};