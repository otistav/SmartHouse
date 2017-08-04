'use strict';
module.exports = function(sequelize, DataTypes) {
  var icon = sequelize.define('icon', {
    name: DataTypes.STRING,
    path: DataTypes.STRING,
    icon: DataTypes.STRING,
    sourceText: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return icon;
};