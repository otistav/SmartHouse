'use strict';
module.exports = function(sequelize, DataTypes) {
  var page = sequelize.define('page', {
    name: {
        type:DataTypes.STRING,
        unique: true
    },
    icon: DataTypes.STRING,
    caption: DataTypes.STRING,
    x_size: DataTypes.INTEGER,
    y_size: DataTypes.INTEGER,
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    iconID: DataTypes.INTEGER,

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return page;
};